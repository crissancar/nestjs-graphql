import { config } from '../../../../config/app';
import { SendgridFrom } from '../../shared/mailers/dtos/sendgrid-send-mail-request.dto';

const { fromEmail, fromName, templates } = config.sendgrid;
const { welcome } = templates;

export const usersConfig = {
	entity: { name: 'user' },
	globalRoute: 'users',
	repository: {
		repositoryInterface: 'UserRepository',
	},
	mailer: {
		mailerInterface: 'UserMailer',
	},
	getController: {
		constants: {
			context: 'UserGetController',
			routes: { find: ':id' },
			params: { id: 'id' },
		},
		logs: {
			find: {
				requestLog: 'Request received to find an user',
			},
			findByCriteria: {
				requestLog: 'Request received to find users by criteria',
			},
		},
	},
	postController: {
		constants: {
			context: 'UserPostController',
		},
		logs: {
			requestLog: 'Request received to create a new user',
			responseLog: 'User created OK response sent',
		},
	},
	putController: {
		constants: {
			context: 'UserPutController',
			routes: { updateUser: ':id', updateUserPassword: ':id/update-password' },
			param: 'id',
		},
		logs: {
			requestLog: 'Request received to update an user',
			responseLog: 'User updated OK response sent',
		},
	},
	deleteController: {
		constants: {
			context: 'UserDeleteController',
			routes: { delete: ':id', softDelete: '/soft-delete/:id' },
			params: { id: 'id' },
		},
		logs: {
			deleteUser: {
				requestLog: 'Request received to delete an user',
				responseLog: 'User deleted OK response sent',
			},
			softDelete: {
				requestLog: 'Request received to soft delete an user',
				responseLog: 'User soft deleted OK response sent',
			},
		},
	},
	creator: {
		constants: {
			context: 'UserCreator',
		},
	},
	updater: {
		constants: {
			context: 'UserUpdater',
		},
	},
	passwordUpdater: {
		constants: {
			context: 'UserPasswordUpdater',
		},
		logs: {
			requestLog: 'Running UserPasswordUpdater',
			checkOldPasswordLog: 'Checking old password',
			responseLog: 'User password updated successfully',
		},
	},
	deleter: {
		constants: {
			context: 'UserDeleter',
		},
		logs: {
			requestLog: 'Running UserDeleter',
			responseLog: (id: string): string => `User with id <${id}> deleted`,
		},
	},
	finderById: {
		constants: {
			context: 'UserFinderById',
		},
	},
	finderByEmail: {
		constants: {
			context: 'UserFinderByEmail',
		},
		logs: {
			responseLog: 'User found successfully',
		},
	},
	finderByCriteria: {
		constants: {
			context: 'UsersFinderByCriteria',
		},
	},
	finderForAuthentication: {
		constants: {
			context: 'UserFinderForAuthentication',
		},
	},
	finderForStrategy: {
		constants: {
			context: 'UserFinderForStrategy',
		},
		logs: {
			requestLog: 'Running UserFinderForStrategy',
			responseLog: 'User found successfully',
		},
	},
	softDeleter: {
		constants: {
			context: 'UserSoftDeleter',
		},
	},
	mailSender: {
		constants: {
			context: 'UserMailSender',
		},
	},
	sendgridMailer: {
		constants: {
			context: 'SendgridUserCreatedMailer',
			from: { name: fromName, email: fromEmail } as SendgridFrom,
		},
		logs: {
			created: {
				requestLog: 'Sending created user mail',
			},
		},
		templates: {
			createdTemplate: {
				templateId: welcome,
			},
		},
	},
};
