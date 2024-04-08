/* eslint-disable @typescript-eslint/no-explicit-any */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FieldNode, GraphQLResolveInfo, Kind, SelectionNode } from 'graphql';

export interface SelectOptions<T> {
	columns: Array<keyof T>;
	relations?: Array<string>;
}

export const SelectOptionsGenerator = createParamDecorator(
	(data: unknown, context: ExecutionContext): SelectOptions<any> => {
		const gqlContext = GqlExecutionContext.create(context);
		const info = gqlContext.getInfo<GraphQLResolveInfo>();
		const selections = info.fieldNodes[0].selectionSet.selections;

		// Check if the criteria is being used in a filter
		const criteriaSelections = selections.filter(
			(selection: FieldNode) => selection.name.value === 'data',
		);

		const columns = criteriaSelections.length
			? extractColumns(criteriaSelections)
			: extractColumns(selections);
		const relations = extractRelations(columns);

		return { columns, relations };
	},
);

function extractColumns(selections: ReadonlyArray<SelectionNode>, path = ''): Array<string> {
	return selections.flatMap((selection: SelectionNode) => {
		if (selection.kind === Kind.FIELD) {
			const field = `${path}${path ? '.' : ''}${selection.name.value}`;

			/*
			If the use case is a criteria filter, the GraphQL selection will come within a “data” object. 
			In that case, it should be ignored as with the properties of the entity. 
			If we do not ignore it, this method would take “data” as a relation of the entity.
			 */
			if (field === 'data') {
				return extractColumns(selection.selectionSet.selections, path);
			}

			return selection.selectionSet
				? extractColumns(selection.selectionSet.selections, field)
				: field;
		}

		return [];
	});
}

function extractRelations(fields: Array<string>): Array<string> {
	const relations = fields
		.filter((field) => field.includes('.'))
		.map((field) => field.split('.')[0]);

	return Array.from(new Set(relations));
}
