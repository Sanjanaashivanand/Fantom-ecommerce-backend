##smart-id

Generate random string for you.

[![NPM](https://nodei.co/npm/smart-id.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/smart-id/)

###Installation

	npm install smart-id

###Get started

	var smartId = require("smart-id");
	var id = smartId.make(); // will make a random string like: mYcAEQExvm

###Api

smartId.make(mode, length)

`mode` is a string, it can be:

+ `a` stands for use only lowercase characters `a-z`.
+ `A` stands for use only uppercase characters `A-Z`.
+ `0` stands for use only numbers `0-9`.
+ `_` stands for add `_` to candidate characters, can take more than one like `$%^&*_`.
+ all before can be used at the same time, like `aA0_` means the candidate is `a-z`, `A-Z`, `0-9` and `_`.
+ `s` is special, it stands for smart mode, this will trim confused characters like `0`, `o` and `O`.

1. default mode is `aA0`.
2. default length is `10`.
