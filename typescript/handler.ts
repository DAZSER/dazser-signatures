export const hello = async (event: AWSLambda.APIGatewayEvent) => {
  return {
    event,
    message: 'Go Serverless v1.0! Your function executed successfully!',
  };
};
