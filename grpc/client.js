require("dotenv").config();
const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = __dirname+"/news.proto";
const port = process.env.GRPC_PORT || 1104;
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const NewsService = grpc.loadPackageDefinition(packageDefinition).NewsService;

const client = new NewsService(
  "127.0.0.1:"+port,
  grpc.credentials.createInsecure()
);

module.exports = client;