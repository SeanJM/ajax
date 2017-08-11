import Ajax from "./Ajax";

const VERSION = "1.1.4";

function dotProperty(method, a, b) {
  let url = typeof a === "string" && a;
  let props = typeof a === "object" ? a : b || {};
  return Object.assign({ type: method, url: url }, props);
}

function ajax(props) {
  return new Ajax(props);
}

ajax.get = function (a, b) {
  return new Ajax(
    dotProperty("get", a, b)
  );
};

ajax.post = function (a, b) {
  return new Ajax(
    dotProperty("post", a, b)
  );
};

ajax.patch = function (a, b) {
  return new Ajax(
    dotProperty("patch", a, b)
  );
};

ajax.delete = function (a, b) {
  return new Ajax(
    dotProperty("delete", a, b)
  );
};

ajax.put = function (a, b) {
  return new Ajax(
    dotProperty("put", a, b)
  );
};

ajax.version = VERSION;
export default ajax;
