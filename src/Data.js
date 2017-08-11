function Data(props) {
  this.contentType = props.contentType;
  this.__rawData = props.data || {};

  // Default content type
  if (
    props.type === "post" &&
    !(this.__rawData instanceof FormData)
  ) {
    this.contentType = "application/json";
  }

  if (props.type === "get") {
    this.encoded();
    this.value = this.value.length ? "?" + this.value : "";
  } else if (/application\/json/.test(this.contentType)) {
    this.json();
  } else if (/urlencoded/.test(this.contentType)) {
    this.encoded();
  } else {
    this.value = this.__rawData;
  }
}

Data.prototype.json = function () {
  this.value = JSON.stringify(this.__rawData);
};

Data.prototype.encoded = function () {
  // http://stackoverflow.com/questions/1714786/querystring-encoding-of-a-javascript-object
  const str = [];

  for (var p in this.__rawData) {
    if (this.__rawData.hasOwnProperty(p)) {
      str.push(
        encodeURIComponent(p) + "=" + encodeURIComponent(this.__rawData[p])
      );
    }
  }

  this.value = str.join("&");
};

export default Data;