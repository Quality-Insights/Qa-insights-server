import postmanResult from './postman.data.example.json';
import { preparePostmanResultV2 } from './src/parser/postman.parser.v2';

const data = preparePostmanResultV2(postmanResult);

console.log(data);