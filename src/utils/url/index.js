export const parseLink = url => {
  if (!url) {
    return {};
  }
  const aTag = document.createElement('a');
  aTag.href = url;
  return {
    host: aTag.host,
    path: aTag.pathname,
    hostname: aTag.hostname,
    protocol: aTag.protocol.slice(0, -1),
  };
};

export const formatParams = data => {
  const arr = [];
  for (const name in data) {
    arr.push(`${encodeURIComponent(name)}=${encodeURIComponent(data[name])}`);
  }
  return arr.join('&');
};
