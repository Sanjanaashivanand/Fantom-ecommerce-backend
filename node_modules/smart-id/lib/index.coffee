lower = "abcdefghijklmnopqrstuvwxyz"
lowerSmart = "abcdefghjkmnpqrstuvwxyz"

upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
upperSmart = "ABCDEFGHJKMNPRSTUVWXY"

number = "0123456789"
numberSmart = "3456789"

###
    generate id
    @param {Object} [options]
    @param {String} [options.mode = "aA0"] mode: 0 = 0 ~ 9, a = a ~ z, A = A ~ Z, s = smart, other characters = add these characters in candidate
    @param {Number} [options.length = 10]
    @return {String} random string
###
exports.make = (mode, length)->
    mode = "aA0" unless mode
    length = 10 unless length
    if length < 1
        throw new Error("length should be a positive number")
    condidates = getCondidates(mode)
    return generateRandomStr(condidates, length)

###
    get condidates characters
    @param {String} mode
    @return {String} condidate characters
###
getCondidates = (mode)->
    isSmart = "s" in mode
    characters = ""
    for c in mode
        switch c
            when "a"
                characters += (if isSmart then lowerSmart else lower)
            when "A"
                characters += (if isSmart then upperSmart else upper)
            when "0"
                characters += (if isSmart then numberSmart else number)
            else
                characters += c
    return characters

###
    generate a random string
    @param {String} condidateChars
    @param {Number} length
    @return {String} random string
###
generateRandomStr = (condidateChars, length)->
    randomStr = ""
    for i in [1..length]
        randomStr += condidateChars[~~(Math.random() * condidateChars.length)]
    return randomStr
