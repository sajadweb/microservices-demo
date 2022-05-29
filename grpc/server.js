require("dotenv").config();
const grpc = require("@grpc/grpc-js");
const PROTO_PATH = __dirname + "/news.proto";
var protoLoader = require("@grpc/proto-loader");
const URL_GRPC = "127.0.0.1:" + (process.env.GRPC_PORT || 1104);
console.log("URL_GRPC", URL_GRPC);
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const newsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
const news = [
  { id: "1", title: "Note 1", body: "Content 1", postImage: "Post image 1" },
  { id: "2", title: "Note 2", body: "Content 2", postImage: "Post image 2" },
];

server.addService(newsProto.NewsService.service, {
  getAllNews: (_, callback) => {
    console.log("getAllNews 1401");
    callback(null, {news});
  },
  getNews: (_, callback) => {
    const newsId = _.request.id;
    const newsItem = news.find(({ id }) => newsId == id);
    callback(null, newsItem);
  },
  deleteNews: (_, callback) => {
    const newsId = _.request.id;
    news = news.filter(({ id }) => id !== newsId);
    callback(null, {});
  },
  editNews: (_, callback) => {
    const newsId = _.request.id;
    const newsItem = news.find(({ id }) => newsId == id);
    newsItem.body = _.request.body;
    newsItem.postImage = _.request.postImage;
    newsItem.title = _.request.title;
    callback(null, newsItem);
  },
  addNews: (call, callback) => {
    let _news = { id: Date.now(), ...call.request };
    news.push(_news);
    callback(null, _news);
  },
});

server.bindAsync(
  URL_GRPC,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log(`Up and Running on port ${port} - This is GRPC service`);
    server.start();
  }
);
