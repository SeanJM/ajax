import Xhr from "./xhr";
import Data from "./Data";

export default function Ajax(props) {
  var self = this;
  var xhr = new Xhr();

  this.data = new Data(props);
  this.type = props.type;
  this.headers = props.headers;

  this.__methods = {
    resolve: [],
    reject: []
  };

  // Remove last slash if it exists, for error tollerance
  props.url = props.url.replace(/\/$/, "");
  this.url = this.type === "get"
    ? props.url + this.data.value
    : props.url;

  xhr.onSuccess(response => this.resolve(response));
  xhr.onError(error => this.reject(error));

  xhr.onProgress(props.onProgress);
  xhr.onComplete(props.onComplete);

  try {
    xhr.open(
      self.type,
      self.url,
      true
    );

    if (self.data.contentType) {
      xhr.setRequestHeader(
        "Content-Type",
        self.data.contentType
      );
    }

    for (var k in self.headers) {
      xhr.setRequestHeader(k, self.headers[k]);
    }

    xhr.send(
      self.data.value
    );
  } catch (err) {
    // Delay is added because on IE 9, the error will throw before
    // the prototypes get a chance to fill the 'this.method'
    setTimeout(() => {
      this.reject(err);
    }, 0);
  }
}

Ajax.prototype.reject = function () {
  let i = 0;
  let n = arguments.length;

  const reject = this.__methods.reject;
  const $arguments = new Array(n);

  for (; i < n; i++) {
    $arguments[i] = arguments[i];
  }

  for (i = 0, n = reject.length; i < n; i++) {
    reject[i].apply(this, $arguments);
  }
};

Ajax.prototype.resolve = function () {
  let i = 0;
  let n = arguments.length;

  const resolve = this.__methods.resolve;
  const $arguments = new Array(n);

  for (; i < n; i++) {
    $arguments[i] = arguments[i];
  }

  for (i = 0, n = resolve.length; i < n; i++) {
    resolve[i].apply(this, $arguments);
  }
};

Ajax.prototype.then = function (resolve, reject) {
  this.__methods.resolve.push(resolve);

  if (reject) {
    this.__methods.reject.push(reject);
  }

  return this;
};

Ajax.prototype.catch = function (reject) {
  this.__methods.reject.push(reject);
  return this;
};