var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  default: () => index
});
module.exports = __toCommonJS(stdin_exports);

// /Users/sellerew/Desktop/libraries/sherpa-core/dist/src/compiler/models.js
var Method;
(function(Method4) {
  Method4["GET"] = "GET";
  Method4["PUT"] = "PUT";
  Method4["POST"] = "POST";
  Method4["PATCH"] = "PATCH";
  Method4["DELETE"] = "DELETE";
})(Method || (Method = {}));
var BundlerType;
(function(BundlerType2) {
  BundlerType2["Vercel"] = "Vercel";
  BundlerType2["Local"] = "Local";
})(BundlerType || (BundlerType = {}));

// /Users/sellerew/Desktop/libraries/sherpa-core/dist/src/environment/io/model.js
var BodyType;
(function(BodyType3) {
  BodyType3["JSON"] = "JSON";
  BodyType3["Text"] = "Text";
  BodyType3["None"] = "None";
})(BodyType || (BodyType = {}));
var CONTENT_TYPE = {
  [BodyType.JSON]: "application/json",
  [BodyType.Text]: "text/plain",
  [BodyType.None]: void 0
};

// /Users/sellerew/Desktop/libraries/sherpa-core/dist/src/environment/io/response/status-text.js
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

// /Users/sellerew/Desktop/libraries/sherpa-core/dist/src/environment/io/response/index.js
var DEFAULT_OPTIONS = {
  headers: {},
  status: 200
};
var Response2 = class _Response {
  static new(options) {
    let _options = _Response.defaultOptions(BodyType.None, options);
    return {
      status: _options.status,
      statusText: _Response.getStatusText(_options.status),
      headers: _options.headers,
      body: void 0,
      bodyType: BodyType.None
    };
  }
  static text(text, options) {
    let _options = _Response.defaultOptions(BodyType.Text, options);
    return {
      status: _options.status,
      statusText: _Response.getStatusText(_options.status),
      headers: _options.headers,
      body: text,
      bodyType: BodyType.Text
    };
  }
  static JSON(JSON2, options) {
    let _options = _Response.defaultOptions(BodyType.JSON, options);
    return {
      status: _options.status,
      statusText: _Response.getStatusText(_options.status),
      headers: _options.headers,
      body: JSON2,
      bodyType: BodyType.JSON
    };
  }
  static redirect(redirect, options) {
    let _options = _Response.defaultOptions(BodyType.None, options);
    return {
      status: 302,
      statusText: _Response.getStatusText(302),
      headers: {
        "Location": redirect,
        ..._options.headers
      },
      body: void 0,
      bodyType: BodyType.None
    };
  }
  static defaultOptions(bodyType, options) {
    let _options = {
      ...DEFAULT_OPTIONS,
      ...options
    };
    _options.headers = {
      "Content-Type": CONTENT_TYPE[bodyType],
      ..._options.headers
    };
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

// /Users/sellerew/Desktop/libraries/sherpa-core/dist/src/compiler/utilities/url/index.js
var URLs = class {
  static getPathname(url) {
    let path = this.getInstance(url).pathname;
    path = path.replace(/\/\.\//g, "/");
    path = path.replace(/\/[^/]+\/\.\.\//g, "/");
    return path;
  }
  static getSearchParams(url) {
    return this.getInstance(url).searchParams;
  }
  static getInstance(url) {
    url = url.endsWith("/") ? url.slice(0, -1) : url;
    return new URL(`https://example.com${url}`);
  }
};

// /Users/sellerew/Desktop/libraries/sherpa-core/dist/src/environment/io/request/utilities.js
var REDIRECT_PARAM_NAME = "SHERPA-PARAMS";
var RequestUtilities = class {
  static pathParamAsQueryParamRedirect(segments2) {
    let paths = [];
    let parameters = [];
    for (let i = 0; i < segments2.length; i++) {
      if (segments2[i].isDynamic) {
        paths.push(`(?<key${i}>[a-zA-Z0-9,-_]+)`);
        parameters.push(`$key${i}`);
      } else {
        paths.push(segments2[i].name);
      }
    }
    let source = `/${paths.join("/")}`;
    let destination = `/${this.getDynamicURL(segments2)}?${REDIRECT_PARAM_NAME}=${parameters.join(",")}`;
    return { source, destination };
  }
  static pathParamAsQueryParamRedirectProcess(url, segments2) {
    let parameters = URLs.getSearchParams(url);
    if (!parameters.has(REDIRECT_PARAM_NAME)) {
      return url;
    }
    let dynamicSegments = parameters.get(REDIRECT_PARAM_NAME);
    let dynamicSegmentIndex = 0;
    parameters.delete(REDIRECT_PARAM_NAME);
    return `/${segments2.map((segment) => {
      if (segment.isDynamic) {
        dynamicSegmentIndex += 1;
        return dynamicSegments[dynamicSegmentIndex - 1];
      } else {
        return segment.name;
      }
    }).join("/")}${parameters.size > 0 ? `?${parameters.toString()}` : ""}`;
  }
  static getDynamicURL(segments2) {
    return segments2.map((segment) => {
      return segment.isDynamic ? `[${segment.name}]` : segment.name;
    }).join("/");
  }
  static parseHeader(headers) {
    let _headers = {};
    Object.keys(headers).forEach((key) => {
      _headers[key] = headers[key];
    });
    return _headers;
  }
  static parseParamsPath(url, segments2) {
    let params = {};
    URLs.getPathname(url).split("/").filter((o) => o != "").forEach((value, index2) => {
      if (segments2[index2].isDynamic) {
        let key = segments2[index2].name;
        let _value = this.parseParam(value);
        this.setValue(params, key, _value);
      }
    });
    return params;
  }
  static parseParamsQuery(url) {
    let params = {};
    URLs.getSearchParams(url).forEach((value, key) => {
      this.setValue(params, key, this.parseParam(value));
    });
    return params;
  }
  static setValue(object, key, values) {
    if (object.hasOwnProperty(key)) {
      if (Array.isArray(object[key])) {
        object[key].push(...values);
      } else {
        object[key] = [object[key], ...values];
      }
    } else {
      object[key] = values.length == 1 ? values[0] : values;
    }
  }
  static parseParam(value) {
    if (value.includes(",")) {
      return value.split(",").map((subValue) => this.parseParam(subValue)).flat();
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

// /Users/sellerew/Desktop/libraries/sherpa-core/dist/src/environment/io/request/transformer.js
var RequestTransform = class {
  static async Local(req, segments2) {
    if (!req.url || !req.method) {
      throw new Error("Missing URL and Methods");
    }
    let { body, bodyType } = await this.parseBodyLocal(req);
    return {
      url: URLs.getPathname(req.url),
      params: {
        path: RequestUtilities.parseParamsPath(req.url, segments2),
        query: RequestUtilities.parseParamsQuery(req.url)
      },
      method: req.method.toUpperCase(),
      headers: RequestUtilities.parseHeader(req.headers),
      body,
      bodyType
    };
  }
  static parseBodyLocal(req) {
    return new Promise((resolve, reject) => {
      let body = "";
      let bodyType = BodyType.Text;
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        let contentType = req.headers["content-type"];
        if (!contentType || body == "") {
          resolve({
            body: void 0,
            bodyType: BodyType.None
          });
        }
        if (contentType == "application/json") {
          body = JSON.parse(body);
          bodyType = BodyType.JSON;
        }
        resolve({
          body,
          bodyType
        });
      });
      req.on("error", (error) => {
        resolve({ body: void 0, bodyType: BodyType.None });
      });
    });
  }
  static async Vercel(req, segments2) {
    let url = RequestUtilities.pathParamAsQueryParamRedirectProcess(req.url, segments2);
    let { body, bodyType } = await this.parseBodyVercel(req);
    return {
      url: URLs.getPathname(url),
      params: {
        path: RequestUtilities.parseParamsPath(url, segments2),
        query: RequestUtilities.parseParamsQuery(url)
      },
      method: req.method.toUpperCase(),
      headers: RequestUtilities.parseHeader(req.headers),
      body,
      bodyType
    };
  }
  static async parseBodyVercel(req) {
    let contentType = req.headers["content-type"];
    if (!contentType) {
      return { body: void 0, bodyType: BodyType.None };
    }
    if (contentType == "application/json") {
      return { body: await req.json(), bodyType: BodyType.JSON };
    }
    return { body: await req.text(), bodyType: BodyType.Text };
  }
};

// /Users/sellerew/Desktop/libraries/sherpa-core/dist/src/environment/io/response/transformer.js
var VercelResponse = Response;
var ResponseTransform = class {
  static Local(response, nativeResponse2) {
    nativeResponse2.statusCode = response.status;
    nativeResponse2.statusMessage = response.statusText;
    for (let [key, value] of Object.entries(response.headers)) {
      if (value) {
        nativeResponse2.setHeader(key, value);
      }
    }
    nativeResponse2.end(this.getBody(response));
  }
  static Vercel(response) {
    return new VercelResponse(this.getBody(response), {
      headers: response.headers,
      status: response.status,
      statusText: response.statusText
    });
  }
  static getBody(response) {
    switch (response.bodyType) {
      case BodyType.Text:
        return response.body;
      case BodyType.JSON:
        return JSON.stringify(response.body);
    }
    return void 0;
  }
};

// /Users/sellerew/Desktop/libraries/sherpa-core/dist/src/environment/handler/index.js
async function Handler(endpoints, context2, request) {
  let callback = endpoints[request.method];
  if (callback) {
    try {
      let response = await callback(request, context2);
      if (!response) {
        return Response2.new({ status: 200 });
      }
      return response;
    } catch (error) {
      return Response2.text(error.message, { status: 500 });
    }
  } else {
    return Response2.new({ status: 405 });
  }
}

// /Users/sellerew/Desktop/libraries/sherpa-core/dist/src/environment/index.js
var __internal__ = {
  RequestTransform,
  ResponseTransform,
  Handler
};

// /Users/sellerew/Desktop/libraries/sherpa-core/test/test2/routes/[id]/path1/index.ts
var path1_exports = {};
__export(path1_exports, {
  GET: () => GET
});

// /Users/sellerew/Desktop/libraries/sherpa-core/src/environment/instantiate/index.ts
var New2 = class {
  static server(config) {
    return config;
  }
  static module(config) {
    return config;
  }
};
var Load2 = class {
  //! FIXME - Load.module<boolean>("", true);
  //! Consider this when writing docs and making context checker
  static module(module2) {
    return module2;
  }
};

// /Users/sellerew/Desktop/libraries/sherpa-core/src/environment/io/model.ts
var CONTENT_TYPE2 = {
  ["JSON" /* JSON */]: "application/json",
  ["Text" /* Text */]: "text/plain",
  ["None" /* None */]: void 0
};

// /Users/sellerew/Desktop/libraries/sherpa-core/src/environment/io/response/status-text.ts
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

// /Users/sellerew/Desktop/libraries/sherpa-core/src/environment/io/response/index.ts
var DEFAULT_OPTIONS2 = {
  headers: {},
  status: 200
};
var Response3 = class _Response {
  static new(options) {
    let _options = _Response.defaultOptions("None" /* None */, options);
    return {
      status: _options.status,
      statusText: _Response.getStatusText(_options.status),
      headers: _options.headers,
      body: void 0,
      bodyType: "None" /* None */
    };
  }
  static text(text, options) {
    let _options = _Response.defaultOptions("Text" /* Text */, options);
    return {
      status: _options.status,
      statusText: _Response.getStatusText(_options.status),
      headers: _options.headers,
      body: text,
      bodyType: "Text" /* Text */
    };
  }
  static JSON(JSON2, options) {
    let _options = _Response.defaultOptions("JSON" /* JSON */, options);
    return {
      status: _options.status,
      statusText: _Response.getStatusText(_options.status),
      headers: _options.headers,
      body: JSON2,
      bodyType: "JSON" /* JSON */
    };
  }
  static redirect(redirect, options) {
    let _options = _Response.defaultOptions("None" /* None */, options);
    return {
      status: 302,
      statusText: _Response.getStatusText(302),
      headers: {
        "Location": redirect,
        ..._options.headers
      },
      body: void 0,
      bodyType: "None" /* None */
    };
  }
  static defaultOptions(bodyType, options) {
    let _options = {
      ...DEFAULT_OPTIONS2,
      ...options
    };
    _options.headers = {
      "Content-Type": CONTENT_TYPE2[bodyType],
      ..._options.headers
    };
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

// /Users/sellerew/Desktop/libraries/sherpa-core/src/environment/index.ts
var SherpaJS = {
  New: New2,
  Load: Load2
};

// /Users/sellerew/Desktop/libraries/sherpa-core/test/test2/routes/[id]/path1/index.ts
function GET(request, context2) {
  return Response3.redirect("../path2");
}

// /Users/sellerew/Desktop/libraries/sherpa-core/test/test1/routes/module/index.ts
var module_default = SherpaJS.Load.module({
  entry: "../../../test2",
  context: {
    test: "Hello World"
  }
});

// <stdin>
var context = module_default.context;
var segments = [{ "name": "module", "isDynamic": false }, { "name": "id", "isDynamic": true }, { "name": "path1", "isDynamic": false }];
async function index(nativeRequest, event) {
  let req = await __internal__.RequestTransform.Vercel(nativeRequest, segments);
  let res = await __internal__.Handler(path1_exports, context, req);
  return __internal__.ResponseTransform.Vercel(res, nativeResponse);
}
// Generated by SherpaJS
