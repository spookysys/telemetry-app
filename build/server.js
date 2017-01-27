"use strict";
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var logger = require("morgan");
var path = require("path");
var errorHandler = require("errorhandler");
var methodOverride = require("method-override");
var index_1 = require("./index");
/**
 * The server.
 *
 * @class Server
 */
var Server = (function () {
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    function Server() {
        //create expressjs application
        this.app = express();
        //configure application
        this.config();
        //add routes
        this.routes();
        //add api
        this.api();
    }
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    Server.bootstrap = function () {
        return new Server();
    };
    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    Server.prototype.api = function () {
        //empty for now
    };
    /**
      * Configure application
      *
      * @class Server
      * @method config
      */
    Server.prototype.config = function () {
        //add static paths
        this.app.use(express.static(path.join(__dirname, "../public")));
        //configure pug
        this.app.set("views", path.join(__dirname, "../views"));
        this.app.set("view engine", "pug");
        //use logger middlware
        this.app.use(logger("dev"));
        //use json form parser middlware
        this.app.use(bodyParser.json());
        //use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        //use cookie parker middleware middlware
        this.app.use(cookieParser("SECRET_GOES_HERE"));
        //use override middlware
        this.app.use(methodOverride());
        //catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        //error handling
        this.app.use(errorHandler());
    };
    /**
      * Create router.
      *
      * @class Server
      * @method config
      * @return void
      */
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        //IndexRoute
        index_1.IndexRoute.create(router);
        //use router middleware
        this.app.use(router);
    };
    return Server;
}());
exports.Server = Server;

//# sourceMappingURL=data:application/json;base64,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LCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gXCJib2R5LXBhcnNlclwiO1xuaW1wb3J0ICogYXMgY29va2llUGFyc2VyIGZyb20gXCJjb29raWUtcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgKiBhcyBsb2dnZXIgZnJvbSBcIm1vcmdhblwiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IGVycm9ySGFuZGxlciA9IHJlcXVpcmUoXCJlcnJvcmhhbmRsZXJcIik7XG5pbXBvcnQgbWV0aG9kT3ZlcnJpZGUgPSByZXF1aXJlKFwibWV0aG9kLW92ZXJyaWRlXCIpO1xuaW1wb3J0IHsgSW5kZXhSb3V0ZSB9IGZyb20gXCIuL2luZGV4XCI7XG5cbi8qKlxuICogVGhlIHNlcnZlci5cbiAqXG4gKiBAY2xhc3MgU2VydmVyXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXJ2ZXIge1xuXG5cdHB1YmxpYyBhcHA6IGV4cHJlc3MuQXBwbGljYXRpb247XG5cblx0LyoqXG5cdCAqIEJvb3RzdHJhcCB0aGUgYXBwbGljYXRpb24uXG5cdCAqXG5cdCAqIEBjbGFzcyBTZXJ2ZXJcblx0ICogQG1ldGhvZCBib290c3RyYXBcblx0ICogQHN0YXRpY1xuXHQgKiBAcmV0dXJuIHtuZy5hdXRvLklJbmplY3RvclNlcnZpY2V9IFJldHVybnMgdGhlIG5ld2x5IGNyZWF0ZWQgaW5qZWN0b3IgZm9yIHRoaXMgYXBwLlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBib290c3RyYXAoKTogU2VydmVyIHtcblx0XHRyZXR1cm4gbmV3IFNlcnZlcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdG9yLlxuXHQgKlxuXHQgKiBAY2xhc3MgU2VydmVyXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKi9cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0Ly9jcmVhdGUgZXhwcmVzc2pzIGFwcGxpY2F0aW9uXG5cdFx0dGhpcy5hcHAgPSBleHByZXNzKCk7XG5cblx0XHQvL2NvbmZpZ3VyZSBhcHBsaWNhdGlvblxuXHRcdHRoaXMuY29uZmlnKCk7XG5cblx0XHQvL2FkZCByb3V0ZXNcblx0XHR0aGlzLnJvdXRlcygpO1xuXG5cdFx0Ly9hZGQgYXBpXG5cdFx0dGhpcy5hcGkoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgUkVTVCBBUEkgcm91dGVzXG5cdCAqXG5cdCAqIEBjbGFzcyBTZXJ2ZXJcblx0ICogQG1ldGhvZCBhcGlcblx0ICovXG5cdHB1YmxpYyBhcGkoKSB7XG5cdFx0Ly9lbXB0eSBmb3Igbm93XG5cdH1cblxuXHQvKipcblx0ICAqIENvbmZpZ3VyZSBhcHBsaWNhdGlvblxuXHQgICpcblx0ICAqIEBjbGFzcyBTZXJ2ZXJcblx0ICAqIEBtZXRob2QgY29uZmlnXG5cdCAgKi9cblx0cHVibGljIGNvbmZpZygpIHtcblx0XHQvL2FkZCBzdGF0aWMgcGF0aHNcblx0XHR0aGlzLmFwcC51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi9wdWJsaWNcIikpKTtcblxuXHRcdC8vY29uZmlndXJlIHB1Z1xuXHRcdHRoaXMuYXBwLnNldChcInZpZXdzXCIsIHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vdmlld3NcIikpO1xuXHRcdHRoaXMuYXBwLnNldChcInZpZXcgZW5naW5lXCIsIFwicHVnXCIpO1xuXG5cdFx0Ly91c2UgbG9nZ2VyIG1pZGRsd2FyZVxuXHRcdHRoaXMuYXBwLnVzZShsb2dnZXIoXCJkZXZcIikpO1xuXG5cdFx0Ly91c2UganNvbiBmb3JtIHBhcnNlciBtaWRkbHdhcmVcblx0XHR0aGlzLmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuXG5cdFx0Ly91c2UgcXVlcnkgc3RyaW5nIHBhcnNlciBtaWRkbHdhcmVcblx0XHR0aGlzLmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHtcblx0XHRcdGV4dGVuZGVkOiB0cnVlXG5cdFx0fSkpO1xuXG5cdFx0Ly91c2UgY29va2llIHBhcmtlciBtaWRkbGV3YXJlIG1pZGRsd2FyZVxuXHRcdHRoaXMuYXBwLnVzZShjb29raWVQYXJzZXIoXCJTRUNSRVRfR09FU19IRVJFXCIpKTtcblxuXHRcdC8vdXNlIG92ZXJyaWRlIG1pZGRsd2FyZVxuXHRcdHRoaXMuYXBwLnVzZShtZXRob2RPdmVycmlkZSgpKTtcblxuXHRcdC8vY2F0Y2ggNDA0IGFuZCBmb3J3YXJkIHRvIGVycm9yIGhhbmRsZXJcblx0XHR0aGlzLmFwcC51c2UoZnVuY3Rpb24gKGVycjogYW55LCByZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikge1xuXHRcdFx0ZXJyLnN0YXR1cyA9IDQwNDtcblx0XHRcdG5leHQoZXJyKTtcblx0XHR9KTtcblxuXHRcdC8vZXJyb3IgaGFuZGxpbmdcblx0XHR0aGlzLmFwcC51c2UoZXJyb3JIYW5kbGVyKCkpO1xuXHR9XG5cblx0LyoqXG5cdCAgKiBDcmVhdGUgcm91dGVyLlxuXHQgICpcblx0ICAqIEBjbGFzcyBTZXJ2ZXJcblx0ICAqIEBtZXRob2QgY29uZmlnXG5cdCAgKiBAcmV0dXJuIHZvaWRcblx0ICAqL1xuXHRwcml2YXRlIHJvdXRlcygpIHtcblx0XHRsZXQgcm91dGVyOiBleHByZXNzLlJvdXRlcjtcblx0XHRyb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5cdFx0Ly9JbmRleFJvdXRlXG5cdFx0SW5kZXhSb3V0ZS5jcmVhdGUocm91dGVyKTtcblxuXHRcdC8vdXNlIHJvdXRlciBtaWRkbGV3YXJlXG5cdFx0dGhpcy5hcHAudXNlKHJvdXRlcik7XG5cdH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
