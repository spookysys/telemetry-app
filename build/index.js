"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var route_1 = require("./route");
/**
 * / route
 *
 * @class User
 */
var IndexRoute = (function (_super) {
    __extends(IndexRoute, _super);
    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
     */
    function IndexRoute() {
        return _super.call(this) || this;
    }
    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    IndexRoute.create = function (router) {
        //log
        console.log("[IndexRoute::create] Creating index route.");
        //add home page route
        router.get("/", function (req, res, next) {
            new IndexRoute().index(req, res, next);
        });
    };
    /**
     * The home page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    IndexRoute.prototype.index = function (req, res, next) {
        //set custom title
        this.title = "Home | Tour of Heros";
        //set options
        var options = {
            "message": "Welcome to the Tour of Heros"
        };
        //render template
        this.render(req, res, "index", options);
    };
    return IndexRoute;
}(route_1.BaseRoute));
exports.IndexRoute = IndexRoute;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLGlDQUFvQztBQUdwQzs7OztHQUlHO0FBQ0g7SUFBZ0MsOEJBQVM7SUFtQnhDOzs7OztPQUtHO0lBQ0g7ZUFDQyxpQkFBTztJQUNSLENBQUM7SUF6QkQ7Ozs7OztPQU1HO0lBQ1csaUJBQU0sR0FBcEIsVUFBcUIsTUFBYztRQUNsQyxLQUFLO1FBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1FBRTFELHFCQUFxQjtRQUNyQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7WUFDL0QsSUFBSSxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFZRDs7Ozs7Ozs7T0FRRztJQUNJLDBCQUFLLEdBQVosVUFBYSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1FBQzNELGtCQUFrQjtRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLHNCQUFzQixDQUFDO1FBRXBDLGFBQWE7UUFDYixJQUFJLE9BQU8sR0FBVztZQUNyQixTQUFTLEVBQUUsOEJBQThCO1NBQ3pDLENBQUM7UUFFRixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQ0YsaUJBQUM7QUFBRCxDQWxEQSxBQWtEQyxDQWxEK0IsaUJBQVMsR0FrRHhDO0FBbERZLGdDQUFVIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEZ1bmN0aW9uLCBSZXF1ZXN0LCBSZXNwb25zZSwgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IEJhc2VSb3V0ZSB9IGZyb20gXCIuL3JvdXRlXCI7XG5cblxuLyoqXG4gKiAvIHJvdXRlXG4gKlxuICogQGNsYXNzIFVzZXJcbiAqL1xuZXhwb3J0IGNsYXNzIEluZGV4Um91dGUgZXh0ZW5kcyBCYXNlUm91dGUge1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgdGhlIHJvdXRlcy5cblx0ICpcblx0ICogQGNsYXNzIEluZGV4Um91dGVcblx0ICogQG1ldGhvZCBjcmVhdGVcblx0ICogQHN0YXRpY1xuXHQgKi9cblx0cHVibGljIHN0YXRpYyBjcmVhdGUocm91dGVyOiBSb3V0ZXIpIHtcblx0XHQvL2xvZ1xuXHRcdGNvbnNvbGUubG9nKFwiW0luZGV4Um91dGU6OmNyZWF0ZV0gQ3JlYXRpbmcgaW5kZXggcm91dGUuXCIpO1xuXG5cdFx0Ly9hZGQgaG9tZSBwYWdlIHJvdXRlXG5cdFx0cm91dGVyLmdldChcIi9cIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG5cdFx0XHRuZXcgSW5kZXhSb3V0ZSgpLmluZGV4KHJlcSwgcmVzLCBuZXh0KTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKlxuXHQgKiBAY2xhc3MgSW5kZXhSb3V0ZVxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICovXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGhvbWUgcGFnZSByb3V0ZS5cblx0ICpcblx0ICogQGNsYXNzIEluZGV4Um91dGVcblx0ICogQG1ldGhvZCBpbmRleFxuXHQgKiBAcGFyYW0gcmVxIHtSZXF1ZXN0fSBUaGUgZXhwcmVzcyBSZXF1ZXN0IG9iamVjdC5cblx0ICogQHBhcmFtIHJlcyB7UmVzcG9uc2V9IFRoZSBleHByZXNzIFJlc3BvbnNlIG9iamVjdC5cblx0ICogQG5leHQge05leHRGdW5jdGlvbn0gRXhlY3V0ZSB0aGUgbmV4dCBtZXRob2QuXG5cdCAqL1xuXHRwdWJsaWMgaW5kZXgocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcblx0XHQvL3NldCBjdXN0b20gdGl0bGVcblx0XHR0aGlzLnRpdGxlID0gXCJIb21lIHwgVG91ciBvZiBIZXJvc1wiO1xuXG5cdFx0Ly9zZXQgb3B0aW9uc1xuXHRcdGxldCBvcHRpb25zOiBPYmplY3QgPSB7XG5cdFx0XHRcIm1lc3NhZ2VcIjogXCJXZWxjb21lIHRvIHRoZSBUb3VyIG9mIEhlcm9zXCJcblx0XHR9O1xuXG5cdFx0Ly9yZW5kZXIgdGVtcGxhdGVcblx0XHR0aGlzLnJlbmRlcihyZXEsIHJlcywgXCJpbmRleFwiLCBvcHRpb25zKTtcblx0fVxufSJdLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
