Array.prototype.random = function(key) {
  let min = null;
  let max = this.sort((a, b) => (b[key] - a[key]))[0][key];
  let array = [];
  for(let i = max; 0 < i; (i = i - 1)) {
    if(this.filter(element => (parseInt(element[key] / i) === (element[key] / i))).length === this.length) {
      min = i;
      break;
    }
  }
  for(let i = 0; i < this.length; i++) {
    let count = (this[i][key] / min);
    for(let a = 0; a < count; a++) {
      let found = this[i];
      found[`${key}_`] = min;
      array.push(found);
    }
  }
  return array;
};

String.random = function(options = {}) {
  
  var crypto = require('crypto');

  var randomIndex;
  var randomBytes;

  var getNextRandomValue = function() {
  	if (randomIndex === undefined || randomIndex >= randomBytes.length) {
	  	randomIndex = 0;
		  randomBytes = crypto.randomBytes(256);
  	}

    var result = randomBytes[randomIndex];
    randomIndex += 1;

  	return result;
  };

  var randomNumber = function(max) {
  	var rand = getNextRandomValue();
  	while (rand >= 256 - (256 % max)) {
  		rand = getNextRandomValue();
  	}
  	return rand % max;
  };

  var lowercase = 'abcdefghijklmnopqrstuvwxyz',
      uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers = '0123456789',
      symbols = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~',
      similarCharacters = /[lIO0]/,
      strictRules = [
        { name: 'lowercase', rule: /[a-z]/ },
        { name: 'uppercase', rule: /[A-Z]/ },
        { name: 'numbers', rule: /[0-9]/ },
        { name: 'symbols', rule: /[!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~]/ }
      ];

  var generate = function(options, pool) {
    var password = '',
        optionsLength = options.length,
    		poolLength = pool.length;
    
  	for (var i = 0; i < optionsLength; i++) {
	  	password += pool[randomNumber(poolLength)];
	  }

    if (options.strict) {
  		var fitsRules = strictRules.reduce(function(result, rule) {
        if (result == false) return false;
        if (options[rule.name] == false) return result;
        return rule.rule.test(password);
      }, true);
      if (!fitsRules) return generate(options, pool);
    }
    return password;
  };

  if (!options.hasOwnProperty('length')) options.length = 10;
	if (!options.hasOwnProperty('numbers')) options.numbers = false;
	if (!options.hasOwnProperty('symbols')) options.symbols = false;
	if (!options.hasOwnProperty('exclude')) options.exclude = '';
	if (!options.hasOwnProperty('uppercase')) options.uppercase = true;
	if (!options.hasOwnProperty('excludeSimilarCharacters')) options.excludeSimilarCharacters = false;
	if (!options.hasOwnProperty('strict')) options.strict = false;

  if (options.strict) {
    var minStrictLength = 1 + (options.numbers ? 1 : 0) + (options.symbols ? 1 : 0) + (options.uppercase ? 1 : 0);
		if (minStrictLength > options.length) {
			throw new TypeError('Çoh büyük');
		}
	}

	var pool = lowercase;
  if (options.uppercase) {
		pool += uppercase;
	}
	if (options.numbers) {
		pool += numbers;
	}
	if (options.symbols) {
		pool += symbols;
	}
	if (options.excludeSimilarCharacters) {
		pool = pool.replace(similarCharacters, '');
	}
	var i = options.exclude.length;
	while (i--) {
		pool = pool.replace(options.exclude[i], '');
	}
  var password = generate(options, pool);
  return password;
};

Date.prototype.toString = function(object = {}) {
  let date = new Date(this.getTime() + 3 * 60 * 60);
  let months = "Ocak,Şubat,Mart,Nisan,Mayıs,Haziran,Temmuz,Ağustos,Eylül,Ekim,Kasım,Aralık".split(",");
  let days = "Pazar,Pazartesi,Salı,Çarşamba,Perşembe,Cuma,Cumartesi".split(",");
  let str = `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${days[date.getDay()]}`;
  if (Object.keys(object).includes("clock") && object["clock"] === true) {
    str += ` ${date.getHours() < 10 ? 0 + date.getHours() + 3 : date.getHours() + 3}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}`;
  }
  return str;
};

Date.msTime = function(milliseconds) {
	if (typeof milliseconds !== 'number') {
		throw new TypeError('Milisaniye sayı olmalı');
	}

	const roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;

	return {
		days: roundTowardsZero(milliseconds / 86400000),
		hours: roundTowardsZero(milliseconds / 3600000) % 24,
		minutes: roundTowardsZero(milliseconds / 60000) % 60,
		seconds: roundTowardsZero(milliseconds / 1000) % 60,
		milliseconds: roundTowardsZero(milliseconds) % 1000,
		microseconds: roundTowardsZero(milliseconds * 1000) % 1000,
		nanoseconds: roundTowardsZero(milliseconds * 1e6) % 1000
	};
};

Date.timeMs = function(val, options) {
  var s = 1000;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var w = d * 7;
  var y = d * 365.25;

  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'değer boş olmayan bir dize veya geçerli bir sayı değil. değer=' +
      JSON.stringify(val)
  );

  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milisaniye?|ms|saniye?|sn|dakika?|dk|saat|gün|hafta|yıl)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch (type) {
      case 'yıl':
        return n * y;
      case 'hafta':
        return n * w;
      case 'gün':
        return n * d;
      case 'saat':
        return n * h;
      case 'dakika':
      case 'dk':
        return n * m;
      case 'saniye':
      case 'sn':
        return n * s;
      case 'milisaniye':
      case 'ms':
        return n;
      default:
        return undefined;
    }
  }

  function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return Math.round(ms / d) + 'g';
    }
    if (msAbs >= h) {
      return Math.round(ms / h) + 's';
    }
    if (msAbs >= m) {
      return Math.round(ms / m) + 'dk';
    }
    if (msAbs >= s) {
      return Math.round(ms / s) + 'sn';
    }
    return ms + 'ms';
  }

  function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return plural(ms, msAbs, d, 'gün');
    }
    if (msAbs >= h) {
      return plural(ms, msAbs, h, 'saat');
    }
    if (msAbs >= m) {
      return plural(ms, msAbs, m, 'dakika');
    }
    if (msAbs >= s) {
      return plural(ms, msAbs, s, 'saniye');
    }
    return ms + ' ms';
  }


  function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
  }
}
