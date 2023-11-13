// helper response
class ResponseJSON {
  static success(res, msg) {
    res.status(200).json({
      message: msg,
    });
  }

  static successWithData(res, msg, data) {
    res.status(200).json({
      message: msg,
      data: data,
    });
  }

  static badRequest(res, msg, err) {
    res.status(400).json({
      message: msg,
      errors: err,
    });
  }

  static unauthorized(res, msg) {
    res.status(401).json({
      message: msg,
    });
  }

  static forbidden(res, msg) {
    res.status(403).json({
      message: msg,
    });
  }

  static notFound(res, msg) {
    res.status(404).json({
      message: msg,
    });
  }
}

// if you wanna know detail for meaning code status response
// see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

export default ResponseJSON;
