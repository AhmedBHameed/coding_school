import {ValidationError} from 'apollo-server-express';
import {GraphQLScalarType} from 'graphql';
import Joi from 'joi';

const requiredStringScalar = new GraphQLScalarType({
  name: 'RequiredString',
  description: 'Required string scalar custom type',
  
  parseValue(value) {
    const stringResult = Joi.string().required().validate(value);
    if (stringResult.error)
      throw new ValidationError(stringResult.error.message);
    return stringResult.value;
  }
});

export default requiredStringScalar;
