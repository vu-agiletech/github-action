import { ApiBody } from '@nestjs/swagger';

export const ApiFile = (fileName: string): MethodDecorator => (
  target: any,
  propertyKey: string,
  description: PropertyDescriptor,
) => {
  ApiBody({
    schema: {
      type: 'object',
      properties: {
        [fileName]: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })(target, propertyKey, description);
};
