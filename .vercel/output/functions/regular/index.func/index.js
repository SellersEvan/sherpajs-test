var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// <define:process.env>
var define_process_env_default = { ALLUSERSPROFILE: "C:\\ProgramData", APPDATA: "C:\\Users\\sellerew\\AppData\\Roaming", CHROME_CRASHPAD_PIPE_NAME: "\\\\.\\pipe\\crashpad_12048_XIQUTPZFBTGJCTLZ", CommonProgramFiles: "C:\\Program Files\\Common Files", "CommonProgramFiles(x86)": "C:\\Program Files (x86)\\Common Files", CommonProgramW6432: "C:\\Program Files\\Common Files", COMPUTERNAME: "RHIT-R90Y2R4M", ComSpec: "C:\\WINDOWS\\system32\\cmd.exe", DriverData: "C:\\Windows\\System32\\Drivers\\DriverData", EFC_9992: 1, FPS_BROWSER_APP_PROFILE_STRING: "Internet Explorer", FPS_BROWSER_USER_PROFILE_STRING: "Default", HOMEDRIVE: "C:", HOMEPATH: "\\Users\\sellerew", LOCALAPPDATA: "C:\\Users\\sellerew\\AppData\\Local", LOGONSERVER: "\\\\RHIT-R90Y2R4M", NUMBER_OF_PROCESSORS: 12, OneDrive: "C:\\Users\\sellerew\\OneDrive - Rose-Hulman Institute of Technology", OneDriveCommercial: "C:\\Users\\sellerew\\OneDrive - Rose-Hulman Institute of Technology", ORIGINAL_XDG_CURRENT_DESKTOP: "undefined", OS: "Windows_NT", Path: "C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\Windows\\System32\\OpenSSH\\;C:\\Program Files\\WindowsPowerShell\\Scripts;C:\\Program Files\\nodejs\\;C:\\Program Files\\Git\\cmd;C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\;C:\\WINDOWS\\System32\\OpenSSH\\;C:\\Program Files\\Docker\\Docker\\resources\\bin;C:\\Users\\sellerew\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\sellerew\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\sellerew\\AppData\\Roaming\\npm;C:\\Users\\sellerew\\AppData\\Local\\GitHubDesktop\\bin;", PATHEXT: ".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC;.CPL", PROCESSOR_ARCHITECTURE: "AMD64", PROCESSOR_IDENTIFIER: "Intel64 Family 6 Model 158 Stepping 10, GenuineIntel", PROCESSOR_LEVEL: 6, PROCESSOR_REVISION: "9e0a", ProgramData: "C:\\ProgramData", ProgramFiles: "C:\\Program Files", "ProgramFiles(x86)": "C:\\Program Files (x86)", ProgramW6432: "C:\\Program Files", PSModulePath: "C:\\Users\\sellerew\\OneDrive - Rose-Hulman Institute of Technology\\Documents\\WindowsPowerShell\\Modules;C:\\Program Files\\WindowsPowerShell\\Modules;C:\\WINDOWS\\system32\\WindowsPowerShell\\v1.0\\Modules", PUBLIC: "C:\\Users\\Public", SESSIONNAME: "Console", SystemDrive: "C:", SystemRoot: "C:\\WINDOWS", TEMP: "C:\\Users\\sellerew\\AppData\\Local\\Temp", TMP: "C:\\Users\\sellerew\\AppData\\Local\\Temp", UATDATA: "C:\\Windows\\CCM\\UATData\\D9F8C395-CAB8-491d-B8AC-179A1FE1BE77", USERDNSDOMAIN: "rose-hulman.edu", USERDOMAIN: "ROSE-HULMAN", USERDOMAIN_ROAMINGPROFILE: "ROSE-HULMAN", USERNAME: "sellerew", USERPROFILE: "C:\\Users\\sellerew", windir: "C:\\WINDOWS", ZES_ENABLE_SYSMAN: 1, TERM_PROGRAM: "vscode", TERM_PROGRAM_VERSION: "1.88.1", LANG: "en_US.UTF-8", COLORTERM: "truecolor", GIT_ASKPASS: "c:\\Users\\sellerew\\AppData\\Local\\Programs\\Microsoft VS Code\\resources\\app\\extensions\\git\\dist\\askpass.sh", VSCODE_GIT_ASKPASS_NODE: "C:\\Users\\sellerew\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe", VSCODE_GIT_ASKPASS_EXTRA_ARGS: "", VSCODE_GIT_ASKPASS_MAIN: "c:\\Users\\sellerew\\AppData\\Local\\Programs\\Microsoft VS Code\\resources\\app\\extensions\\git\\dist\\askpass-main.js", VSCODE_GIT_IPC_HANDLE: "\\\\.\\pipe\\vscode-git-668f0b53a1-sock", VSCODE_INJECTION: 1, foo: 3, SHERPA_PLATFORM: "Vercel" };

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
  BodyType3["None"] = "None";
})(BodyType || (BodyType = {}));
var CONTENT_TYPE = {
  [BodyType.JSON]: "application/json",
  [BodyType.Text]: "text/plain",
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

// /Users/sellerew/Desktop/libraries/SherpaJS/dist/src/internal/handler/index.js
async function Handler(endpoints, context2, request) {
  let callback = endpoints[request.method];
  if (callback) {
    try {
      let response = await callback(request, context2);
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
  let { body, bodyType } = await this.parseBodyVercel(req, headers);
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
    case BodyType.Text:
      return response.body;
    case BodyType.JSON:
      return JSON.stringify(response.body);
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

// /Users/sellerew/Desktop/libraries/SherpaJS/tests/servers/pass-primary/routes/regular/index.ts
var regular_exports = {};
__export(regular_exports, {
  DELETE: () => DELETE,
  GET: () => GET,
  PATCH: () => PATCH,
  POST: () => POST,
  PUT: () => PUT
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

// /Users/sellerew/Desktop/libraries/SherpaJS/tests/servers/pass-primary/routes/regular/index.ts
function GET(request, context2) {
  return ResponseBuilder2.JSON({
    request,
    context: context2,
    env: define_process_env_default
  }, { status: 201 });
}
function POST(request, context2) {
  return ResponseBuilder2.JSON({
    request,
    context: context2
  }, { status: 201 });
}
function PUT(request, context2) {
  return ResponseBuilder2.JSON({
    request,
    context: context2
  }, { status: 201 });
}
function PATCH(request, context2) {
  return ResponseBuilder2.JSON({
    request,
    context: context2
  }, { status: 201 });
}
function DELETE(request, context2) {
  return ResponseBuilder2.JSON({
    request,
    context: context2
  }, { status: 201 });
}

// /Users/sellerew/Desktop/libraries/SherpaJS/tests/servers/pass-primary/sherpa.server.ts
var sherpa_server_default = SherpaJS.New.server({
  context: "foo"
});

// <stdin>
var context = sherpa_server_default.context;
var segments = [{ "name": "regular", "isDynamic": false }];
async function index(nativeRequest, event) {
  let req = await RequestVercel(nativeRequest, segments);
  let res = await Handler(regular_exports, context, req);
  return ResponseVercel(req, res);
}
export {
  index as default
};
// Generated by SherpaJS
