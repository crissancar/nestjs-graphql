import { applyDecorators } from '@nestjs/common';
import { IsOptional, IsString, registerDecorator, ValidationArguments } from 'class-validator';

export function ValidateSortColumn<T>(type: T): (object: object, propertyName: string) => void {
	const decoratorsApplied = applyDecorators(IsOptional(), IsString());

	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'validateSortColumn',
			target: object.constructor,
			propertyName,
			constraints: [type],
			validator: {
				validate(value: string, args: ValidationArguments) {
					const TypeClass = args.constraints[0] as new () => T;
					const typeClassInstance = new TypeClass();

					const propertyNames = Object.keys(typeClassInstance);

					return propertyNames.includes(value);
				},
				defaultMessage(args: ValidationArguments) {
					const TypeClass = args.constraints[0] as new () => T;
					const property = args.property;

					return `${property} must be a property of ${TypeClass.name}`;
				},
			},
		});

		decoratorsApplied(object, propertyName);
	};
}
