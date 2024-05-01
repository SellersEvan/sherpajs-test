var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// /Users/sellerew/Desktop/libraries/SherpaJS/dist/src/compiler/models.js
var EXPORT_VARIABLES_METHODS = ["GET", "POST", "PATCH", "DELETE", "PUT"];
var EXPORT_VARIABLES = [...EXPORT_VARIABLES_METHODS];
var Method;
(function(Method3) {
  Method3["GET"] = "GET";
  Method3["PUT"] = "PUT";
  Method3["POST"] = "POST";
  Method3["PATCH"] = "PATCH";
  Method3["DELETE"] = "DELETE";
})(Method || (Method = {}));
var BundlerType;
(function(BundlerType2) {
  BundlerType2["Vercel"] = "Vercel";
  BundlerType2["local"] = "local";
})(BundlerType || (BundlerType = {}));

// /Users/sellerew/Desktop/libraries/SherpaJS/dist/src/native/url/index.js
var OriginURL = class extends URL {
  constructor(input, base) {
    super(input, base ? base : "http://0.0");
    this.pathname = this.pathname.endsWith("/") ? this.pathname.slice(0, -1) : this.pathname;
  }
};

// /Users/sellerew/Desktop/libraries/SherpaJS/dist/src/native/parameters/index.js
var Parameters = class _Parameters {
  parameters = {};
  has(key) {
    return this.parameters[key] != void 0;
  }
  get(key) {
    if (!this.has(key) || this.parameters[key].length == 0) {
      return void 0;
    }
    return this.parameters[key][0];
  }
  getAll(key) {
    if (!this.has(key)) {
      return void 0;
    }
    return this.parameters[key];
  }
  keys() {
    return Object.keys(this.parameters);
  }
  toJSON() {
    return { ...this.parameters };
  }
  static getPathParams(url, segments2) {
    let params = new _Parameters();
    new OriginURL(url).pathname.split("/").filter((o) => o != "").forEach((value, index2) => {
      if (segments2[index2].isDynamic) {
        params.append(segments2[index2].name, value, false);
      }
    });
    return params;
  }
  static getQueryParams(url) {
    let params = new _Parameters();
    new OriginURL(url).searchParams.forEach((value, key) => {
      params.append(key, value);
    });
    return params;
  }
  append(key, value, useDelimiter = true) {
    if (!this.has(key)) {
      this.parameters[key] = [];
    }
    this.parameters[key].push(...this.parse(value, useDelimiter));
  }
  parse(value, useDelimiter) {
    if (useDelimiter && value.includes(",")) {
      return value.split(",").map((subValue) => this.parse(subValue, useDelimiter)).flat();
    } else {
      if (value == "true") {
        return [true];
      } else if (value == "false") {
        return [false];
      } else if (/^\d+$/.test(value)) {
        return [parseInt(value)];
      }
      return [value];
    }
  }
};

// /Users/sellerew/Desktop/libraries/SherpaJS/dist/src/native/headers/index.js
var IHeaders = class _IHeaders {
  headers;
  constructor(init) {
    this.headers = {};
    if (init) {
      if (init instanceof Headers || init instanceof _IHeaders) {
        init.forEach((value, name) => {
          this.set(name, value);
        });
      } else if (Array.isArray(init)) {
        init.forEach(([name, value]) => {
          this.append(name, value);
        });
      } else {
        Object.entries(init).forEach(([name, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => this.append(name, v));
          } else {
            this.set(name, value);
          }
        });
      }
    }
  }
  append(name, value) {
    let normalizedName = name.toLowerCase();
    this.headers[normalizedName] = this.headers[normalizedName] ? `${this.headers[normalizedName]}, ${value}` : value;
  }
  has(name) {
    return this.get(name) != null;
  }
  get(name) {
    return this.headers[name.toLowerCase()] || null;
  }
  set(name, value) {
    this.headers[name.toLowerCase()] = value;
  }
  delete(name) {
    delete this.headers[name.toLowerCase()];
  }
  toJSON() {
    return { ...this.headers };
  }
  toString() {
    return JSON.stringify(this.headers);
  }
  getSetCookie() {
    return Object.entries(this.headers).filter(([name]) => name.toLowerCase() === "set-cookie").flatMap(([, value]) => value.split(", "));
  }
  forEach(callbackfn, thisArg) {
    for (const [name, value] of Object.entries(this.headers)) {
      callbackfn.call(thisArg, value, name, this);
    }
  }
  keys() {
    return Object.keys(this.headers)[Symbol.iterator]();
  }
  values() {
    return Object.values(this.headers)[Symbol.iterator]();
  }
  entries() {
    return Object.entries(this.headers)[Symbol.iterator]();
  }
  *[Symbol.iterator]() {
    for (const [name, value] of Object.entries(this.headers)) {
      yield [name, value];
    }
  }
};

// /Users/sellerew/Desktop/libraries/SherpaJS/dist/src/native/model.js
var BodyType;
(function(BodyType3) {
  BodyType3["JSON"] = "JSON";
  BodyType3["Text"] = "Text";
  BodyType3["HTML"] = "HTML";
  BodyType3["None"] = "None";
})(BodyType || (BodyType = {}));
var CONTENT_TYPE = {
  [BodyType.JSON]: "application/json",
  [BodyType.Text]: "text/plain",
  [BodyType.HTML]: "text/html",
  [BodyType.None]: void 0
};

// /Users/sellerew/Desktop/libraries/SherpaJS/dist/src/native/response/status-text.js
var STATUS_TEXT = {
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",
  103: "Early Hints",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  208: "Already Reported",
  226: "IM Used",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a Teapot \u{1FAD6}",
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  510: "Not Extended",
  511: "Network Authentication Required"
};

// /Users/sellerew/Desktop/libraries/SherpaJS/dist/src/native/response/index.js
var DEFAULT_OPTIONS = {
  headers: new IHeaders(),
  status: 200
};
var ResponseBuilder = class _ResponseBuilder {
  static new(options) {
    let _options = _ResponseBuilder.defaultOptions(BodyType.None, options);
    return {
      status: _options.status,
      statusText: _ResponseBuilder.getStatusText(_options.status),
      headers: _options.headers,
      body: void 0,
      bodyType: BodyType.None
    };
  }
  static text(text, options) {
    let _options = _ResponseBuilder.defaultOptions(BodyType.Text, options);
    return {
      status: _options.status,
      statusText: _ResponseBuilder.getStatusText(_options.status),
      headers: _options.headers,
      body: text.toString(),
      bodyType: BodyType.Text
    };
  }
  static JSON(JSON2, options) {
    let _options = _ResponseBuilder.defaultOptions(BodyType.JSON, options);
    let _isCallable = JSON2.toJSON && typeof JSON2.toJSON === "function";
    return {
      status: _options.status,
      statusText: _ResponseBuilder.getStatusText(_options.status),
      headers: _options.headers,
      body: _isCallable ? JSON2.toJSON() : JSON2,
      bodyType: BodyType.JSON
    };
  }
  static HTML(html, options) {
    let _options = _ResponseBuilder.defaultOptions(BodyType.HTML, options);
    return {
      status: _options.status,
      statusText: _ResponseBuilder.getStatusText(_options.status),
      headers: _options.headers,
      body: html,
      bodyType: BodyType.HTML
    };
  }
  static redirect(redirect, options) {
    let _options = _ResponseBuilder.defaultOptions(BodyType.None, options);
    if (!_options.headers.has("Location")) {
      _options.headers.set("Location", redirect);
    }
    return {
      status: 302,
      statusText: _ResponseBuilder.getStatusText(302),
      headers: _options.headers,
      body: void 0,
      bodyType: BodyType.None
    };
  }
  static defaultOptions(bodyType, options) {
    let _options = {
      ...DEFAULT_OPTIONS,
      ...options
    };
    if (!_options.headers.has("Content-Type")) {
      _options.headers.set("Content-Type", CONTENT_TYPE[bodyType]);
    }
    return _options;
  }
  static getStatusText(status) {
    let text = STATUS_TEXT[status];
    if (!text) {
      throw new Error(`Status code "${status}" is invalid.`);
    }
    return text;
  }
};

// /Users/sellerew/Desktop/libraries/SherpaJS/dist/src/internal/handler/index.js
async function Handler(endpoints, view2, context2, request) {
  if (view2 && request.method == Method.GET) {
    try {
      return ResponseBuilder.HTML(decodeURIComponent(view2));
    } catch (error) {
      return ResponseBuilder.text(error.message, { status: 500 });
    }
  } else if (endpoints[request.method]) {
    try {
      let response = await endpoints[request.method](request, context2);
      if (!response) {
        return ResponseBuilder.new({ status: 200 });
      }
      return response;
    } catch (error) {
      return ResponseBuilder.text(error.message, { status: 500 });
    }
  } else {
    return ResponseBuilder.new({ status: 405 });
  }
}

// /Users/sellerew/Desktop/libraries/SherpaJS/dist/src/internal/request/index.js
async function RequestVercel(req, segments2) {
  let headers = new IHeaders(req.headers);
  let { body, bodyType } = await parseBodyVercel(req, headers);
  return {
    url: new OriginURL(req.url).pathname,
    params: {
      path: Parameters.getPathParams(req.url, segments2),
      query: Parameters.getQueryParams(req.url)
    },
    method: req.method.toUpperCase(),
    headers,
    body,
    bodyType
  };
}
async function parseBodyVercel(req, headers) {
  if (req.method.toUpperCase() == Method.GET) {
    return { body: void 0, bodyType: BodyType.None };
  }
  let contentType = (headers.get("Content-Type") || "").toLowerCase();
  if (!contentType) {
    return { body: void 0, bodyType: BodyType.None };
  }
  if (contentType == "application/json") {
    return { body: await req.json(), bodyType: BodyType.JSON };
  }
  return { body: await req.text(), bodyType: BodyType.Text };
}

// /Users/sellerew/Desktop/libraries/SherpaJS/dist/src/internal/response/index.js
var VercelResponse = Response;
function ResponseVercel(request, response) {
  applyRedirectHeaders(request, response);
  return new VercelResponse(getBody(response), {
    headers: response.headers,
    status: response.status,
    statusText: response.statusText
  });
}
function getBody(response) {
  switch (response.bodyType) {
    case BodyType.JSON:
      return JSON.stringify(response.body);
    default:
      return response.body;
  }
  return void 0;
}
function applyRedirectHeaders(request, response) {
  if (response.headers.has("Location")) {
    let host = request.headers.get("host");
    let protocol = host.toLowerCase().includes("localhost") ? "http" : "https";
    let origin = `${protocol}://${host}`;
    let url = new OriginURL(request.url, origin);
    let path = url.origin + url.pathname;
    path = !path.endsWith("/") ? `${path}/` : path;
    response.headers.set("Location", new OriginURL(response.headers.get("Location"), path).href);
  }
}

// /Users/sellerew/Desktop/libraries/SherpaJS/tests/endpoints/server/routes/regular/response/redirect/success/index.ts
var success_exports = {};
__export(success_exports, {
  GET: () => GET
});

// /Users/sellerew/Desktop/libraries/SherpaJS/src/native/headers/index.ts
var IHeaders2 = class _IHeaders {
  headers;
  constructor(init) {
    this.headers = {};
    if (init) {
      if (init instanceof Headers || init instanceof _IHeaders) {
        init.forEach((value, name) => {
          this.set(name, value);
        });
      } else if (Array.isArray(init)) {
        init.forEach(([name, value]) => {
          this.append(name, value);
        });
      } else {
        Object.entries(init).forEach(([name, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => this.append(name, v));
          } else {
            this.set(name, value);
          }
        });
      }
    }
  }
  append(name, value) {
    let normalizedName = name.toLowerCase();
    this.headers[normalizedName] = this.headers[normalizedName] ? `${this.headers[normalizedName]}, ${value}` : value;
  }
  has(name) {
    return this.get(name) != null;
  }
  get(name) {
    return this.headers[name.toLowerCase()] || null;
  }
  set(name, value) {
    this.headers[name.toLowerCase()] = value;
  }
  delete(name) {
    delete this.headers[name.toLowerCase()];
  }
  toJSON() {
    return { ...this.headers };
  }
  toString() {
    return JSON.stringify(this.headers);
  }
  getSetCookie() {
    return Object.entries(this.headers).filter(([name]) => name.toLowerCase() === "set-cookie").flatMap(([, value]) => value.split(", "));
  }
  forEach(callbackfn, thisArg) {
    for (const [name, value] of Object.entries(this.headers)) {
      callbackfn.call(thisArg, value, name, this);
    }
  }
  keys() {
    return Object.keys(this.headers)[Symbol.iterator]();
  }
  values() {
    return Object.values(this.headers)[Symbol.iterator]();
  }
  entries() {
    return Object.entries(this.headers)[Symbol.iterator]();
  }
  *[Symbol.iterator]() {
    for (const [name, value] of Object.entries(this.headers)) {
      yield [name, value];
    }
  }
};

// /Users/sellerew/Desktop/libraries/SherpaJS/src/native/model.ts
var CONTENT_TYPE2 = {
  ["JSON" /* JSON */]: "application/json",
  ["Text" /* Text */]: "text/plain",
  ["HTML" /* HTML */]: "text/html",
  ["None" /* None */]: void 0
};

// /Users/sellerew/Desktop/libraries/SherpaJS/src/native/response/status-text.ts
var STATUS_TEXT2 = {
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",
  103: "Early Hints",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  208: "Already Reported",
  226: "IM Used",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a Teapot \u{1FAD6}",
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  510: "Not Extended",
  511: "Network Authentication Required"
};

// /Users/sellerew/Desktop/libraries/SherpaJS/src/native/response/index.ts
var DEFAULT_OPTIONS2 = {
  headers: new IHeaders2(),
  status: 200
};
var ResponseBuilder2 = class _ResponseBuilder {
  static new(options) {
    let _options = _ResponseBuilder.defaultOptions("None" /* None */, options);
    return {
      status: _options.status,
      statusText: _ResponseBuilder.getStatusText(_options.status),
      headers: _options.headers,
      body: void 0,
      bodyType: "None" /* None */
    };
  }
  static text(text, options) {
    let _options = _ResponseBuilder.defaultOptions("Text" /* Text */, options);
    return {
      status: _options.status,
      statusText: _ResponseBuilder.getStatusText(_options.status),
      headers: _options.headers,
      body: text.toString(),
      bodyType: "Text" /* Text */
    };
  }
  static JSON(JSON2, options) {
    let _options = _ResponseBuilder.defaultOptions("JSON" /* JSON */, options);
    let _isCallable = JSON2.toJSON && typeof JSON2.toJSON === "function";
    return {
      status: _options.status,
      statusText: _ResponseBuilder.getStatusText(_options.status),
      headers: _options.headers,
      body: _isCallable ? JSON2.toJSON() : JSON2,
      bodyType: "JSON" /* JSON */
    };
  }
  static HTML(html, options) {
    let _options = _ResponseBuilder.defaultOptions("HTML" /* HTML */, options);
    return {
      status: _options.status,
      statusText: _ResponseBuilder.getStatusText(_options.status),
      headers: _options.headers,
      body: html,
      bodyType: "HTML" /* HTML */
    };
  }
  static redirect(redirect, options) {
    let _options = _ResponseBuilder.defaultOptions("None" /* None */, options);
    if (!_options.headers.has("Location")) {
      _options.headers.set("Location", redirect);
    }
    return {
      status: 302,
      statusText: _ResponseBuilder.getStatusText(302),
      headers: _options.headers,
      body: void 0,
      bodyType: "None" /* None */
    };
  }
  static defaultOptions(bodyType, options) {
    let _options = {
      ...DEFAULT_OPTIONS2,
      ...options
    };
    if (!_options.headers.has("Content-Type")) {
      _options.headers.set("Content-Type", CONTENT_TYPE2[bodyType]);
    }
    return _options;
  }
  static getStatusText(status) {
    let text = STATUS_TEXT2[status];
    if (!text) {
      throw new Error(`Status code "${status}" is invalid.`);
    }
    return text;
  }
};

// /Users/sellerew/Desktop/libraries/SherpaJS/src/compiler/models.ts
var EXPORT_VARIABLES_METHODS2 = ["GET", "POST", "PATCH", "DELETE", "PUT"];
var EXPORT_VARIABLES2 = [...EXPORT_VARIABLES_METHODS2];

// /Users/sellerew/Desktop/libraries/SherpaJS/src/instantiate/index.ts
var New = class {
  static server(config) {
    return config;
  }
  static module(config) {
    return {
      ...config,
      load: (context2) => {
        return new config.interface(context2);
      }
    };
  }
};

// /Users/sellerew/Desktop/libraries/SherpaJS/index.ts
var SherpaJS = {
  New
};

// /Users/sellerew/Desktop/libraries/SherpaJS/tests/endpoints/server/routes/regular/response/redirect/success/index.ts
function GET(request, context2) {
  return ResponseBuilder2.JSON({
    request,
    context: context2
  });
}

// /Users/sellerew/Desktop/libraries/SherpaJS/tests/endpoints/server/sherpa.server.ts
var sherpa_server_default = SherpaJS.New.server({
  context: "foo"
});

// <stdin>
var view = "";
var context = sherpa_server_default.context;
var segments = [{ "name": "regular", "isDynamic": false }, { "name": "response", "isDynamic": false }, { "name": "redirect", "isDynamic": false }, { "name": "success", "isDynamic": false }];
async function index(nativeRequest, event) {
  let req = await RequestVercel(nativeRequest, segments);
  let res = await Handler(success_exports, view, context, req);
  return ResponseVercel(req, res);
}
export {
  index as default
};
// Generated by SherpaJS
