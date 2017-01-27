"use strict";
/**
 * Constructor
 *
 * @class BaseRoute
 */
var BaseRoute = (function () {
    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    function BaseRoute() {
        //initialize variables
        this.title = "Tour of Heros";
        this.scripts = [];
    }
    /**
     * Add a JS external file to the request.
     *
     * @class BaseRoute
     * @method addScript
     * @param src {string} The src to the external JS file.
     * @return {BaseRoute} Self for chaining
     */
    BaseRoute.prototype.addScript = function (src) {
        this.scripts.push(src);
        return this;
    };
    /**
     * Render a page.
     *
     * @class BaseRoute
     * @method render
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param view {String} The view to render.
     * @param options {Object} Additional options to append to the view's local scope.
     * @return void
     */
    BaseRoute.prototype.render = function (req, res, view, options) {
        //add constants
        res.locals.BASE_URL = "/";
        //add scripts
        res.locals.scripts = this.scripts;
        //add title
        res.locals.title = this.title;
        //render view
        res.render(view, options);
    };
    return BaseRoute;
}());
exports.BaseRoute = BaseRoute;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQTs7OztHQUlHO0FBQ0g7SUFNQzs7Ozs7T0FLRztJQUNIO1FBQ0Msc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksNkJBQVMsR0FBaEIsVUFBaUIsR0FBVztRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSSwwQkFBTSxHQUFiLFVBQWMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFZLEVBQUUsT0FBZ0I7UUFDeEUsZUFBZTtRQUNmLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUUxQixhQUFhO1FBQ2IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUVsQyxXQUFXO1FBQ1gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUU5QixhQUFhO1FBQ2IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNGLGdCQUFDO0FBQUQsQ0F2REEsQUF1REMsSUFBQTtBQXZEWSw4QkFBUyIsImZpbGUiOiJyb3V0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRGdW5jdGlvbiwgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xuXG4vKipcbiAqIENvbnN0cnVjdG9yXG4gKlxuICogQGNsYXNzIEJhc2VSb3V0ZVxuICovXG5leHBvcnQgY2xhc3MgQmFzZVJvdXRlIHtcblxuXHRwcm90ZWN0ZWQgdGl0bGU6IHN0cmluZztcblxuXHRwcml2YXRlIHNjcmlwdHM6IHN0cmluZ1tdO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKlxuXHQgKiBAY2xhc3MgQmFzZVJvdXRlXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKi9cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0Ly9pbml0aWFsaXplIHZhcmlhYmxlc1xuXHRcdHRoaXMudGl0bGUgPSBcIlRvdXIgb2YgSGVyb3NcIjtcblx0XHR0aGlzLnNjcmlwdHMgPSBbXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgYSBKUyBleHRlcm5hbCBmaWxlIHRvIHRoZSByZXF1ZXN0LlxuXHQgKlxuXHQgKiBAY2xhc3MgQmFzZVJvdXRlXG5cdCAqIEBtZXRob2QgYWRkU2NyaXB0XG5cdCAqIEBwYXJhbSBzcmMge3N0cmluZ30gVGhlIHNyYyB0byB0aGUgZXh0ZXJuYWwgSlMgZmlsZS5cblx0ICogQHJldHVybiB7QmFzZVJvdXRlfSBTZWxmIGZvciBjaGFpbmluZ1xuXHQgKi9cblx0cHVibGljIGFkZFNjcmlwdChzcmM6IHN0cmluZyk6IEJhc2VSb3V0ZSB7XG5cdFx0dGhpcy5zY3JpcHRzLnB1c2goc3JjKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW5kZXIgYSBwYWdlLlxuXHQgKlxuXHQgKiBAY2xhc3MgQmFzZVJvdXRlXG5cdCAqIEBtZXRob2QgcmVuZGVyXG5cdCAqIEBwYXJhbSByZXEge1JlcXVlc3R9IFRoZSByZXF1ZXN0IG9iamVjdC5cblx0ICogQHBhcmFtIHJlcyB7UmVzcG9uc2V9IFRoZSByZXNwb25zZSBvYmplY3QuXG5cdCAqIEBwYXJhbSB2aWV3IHtTdHJpbmd9IFRoZSB2aWV3IHRvIHJlbmRlci5cblx0ICogQHBhcmFtIG9wdGlvbnMge09iamVjdH0gQWRkaXRpb25hbCBvcHRpb25zIHRvIGFwcGVuZCB0byB0aGUgdmlldydzIGxvY2FsIHNjb3BlLlxuXHQgKiBAcmV0dXJuIHZvaWRcblx0ICovXG5cdHB1YmxpYyByZW5kZXIocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCB2aWV3OiBzdHJpbmcsIG9wdGlvbnM/OiBPYmplY3QpIHtcblx0XHQvL2FkZCBjb25zdGFudHNcblx0XHRyZXMubG9jYWxzLkJBU0VfVVJMID0gXCIvXCI7XG5cblx0XHQvL2FkZCBzY3JpcHRzXG5cdFx0cmVzLmxvY2Fscy5zY3JpcHRzID0gdGhpcy5zY3JpcHRzO1xuXG5cdFx0Ly9hZGQgdGl0bGVcblx0XHRyZXMubG9jYWxzLnRpdGxlID0gdGhpcy50aXRsZTtcblxuXHRcdC8vcmVuZGVyIHZpZXdcblx0XHRyZXMucmVuZGVyKHZpZXcsIG9wdGlvbnMpO1xuXHR9XG59Il0sInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
