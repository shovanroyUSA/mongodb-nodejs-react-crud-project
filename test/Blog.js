
// test cases for a Node.js and Express application using the Mocha testing framework 
//and the Chai assertion library
let Blog = require("../models/Blog");
let chai = require("chai"); //Chai is an assertion library that works with Node.js and in the browser.
let chaiHttp = require("chai-http"); //Chai HTTP is an add-on library that works with Chai and allows us to make HTTP requests to our application.
let app = require("../app");
chai.should();//Chai should is an assertion style that is used with Chai. It extends the Object.prototype to provide a single getter as the starting point for your language assertions.

chai.use(chaiHttp);

describe("Blogs", () => {
  beforeEach((done) => { //beforeEach hook ensures that before each test case, the "Blogs" collection is cleared.
    Blog.deleteMany({}, (err) => {
      done();
    });
  });
  describe("/GET blog", () => {
    it("it should GET all the blogs", (done) => {
      chai
        .request(app)
        .get("/api/blogs")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });
  describe("/POST blog", () => {
    it("it should new POST a blog", (done) => {
      let blog = {
        title: "This is the first blog",
        body: "This is a blog post",
        image:
          "https://www.silicondojo.com/wp-content/uploads/2023/07/Screenshot-from-2023-07-19-10-41-27-1536x960.png",
      };
      chai
        .request(app)
        .post("/api/blogs")
        .send(blog)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.status.should.be.eql("success");
          done();
        });
    });
  });
  describe("/GET/:id blog", () => {
    it("it should GET a blog by the id", (done) => {
      let blog = new Blog({
        title: "This is the first blog",
        body: "This is a blog post",
        image:
          "https://www.silicondojo.com/wp-content/uploads/2023/07/Screenshot-from-2023-07-19-10-41-27-1536x960.png",
      });
      blog.save((err, blog) => {
        chai
          .request(app)
          .get("/api/blogs/" + blog.id)
          .send(blog)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
  describe("/PUT/:id blog", () => {
    it("it should UPDATE a blog given the id", (done) => {
      let blog = new Blog({
        title: "This is the first blog",
        body: "This is a blog post",
        image:
          "https://www.silicondojo.com/wp-content/uploads/2023/07/Screenshot-from-2023-07-19-10-41-27-1536x960.png",
      });
      blog.save((err, blog) => {
        console.log(blog.id);
        chai
          .request(app)
          .put("/api/blogs/" + blog.id)
          .send({
            title: "The first blog was updated after intial creation",
            body: "This is a blog post",
            image:
              "https://www.silicondojo.com/wp-content/uploads/2023/07/Screenshot-from-2023-07-19-10-41-27-1536x960.png",
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
  describe("/DELETE/:id blog", () => {
    it("it should DELETE a blog given the id", (done) => {
      let blog = new Blog({
        title: "This is the first blog",
        body: "This is a blog post",
        image:
          "https://www.silicondojo.com/wp-content/uploads/2023/07/Screenshot-from-2023-07-19-10-41-27-1536x960.png",
      });
      blog.save((err, blog) => {
        chai
          .request(app)
          .delete("/api/blogs/" + blog.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
});
