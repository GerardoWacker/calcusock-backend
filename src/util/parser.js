function tokenise(expr)
{
    const tokens = []
    const regex = /\s*([0-9]+\.?[0-9]*|\+|\-|\*|\/|\^|\(|\))\s*/g

    let match

    while ((match = regex.exec(expr)) !== null)
    {
        tokens.push(match[1])
    }

    return tokens
}

function parse(tokens)
{
    function parsePrimary()
    {
        const token = tokens.shift()

        if (token === '(')
        {
            const expr = parse(tokens)
            if (tokens.shift() !== ')') throw new Error("[SYNTAX ERROR] Falta cerrar paréntesis.")
            return expr
        }

        if (!isNaN(token))
        {
            return parseFloat(token)
        }

        throw new Error(`[SYNTAX ERROR] El token ${token} fue inesperado.`)
    }

    function parsePower()
    {
        let left = parsePrimary()

        while (tokens[0] === '^')
        {
            tokens.shift()
            const right = parsePower()
            left = Math.pow(left, right)
        }

        return left
    }

    function parseFactor()
    {
        let left = parsePower()

        while (tokens[0] === '*' || tokens[0] === '/')
        {
            const op = tokens.shift()
            const right = parsePower()
            left = op === '*' ? left * right : left / right
        }

        return left
    }

    function parseSumSubs()
    {
        let left = parseFactor()

        while (tokens[0] === '+' || tokens[0] === '-')
        {
            const op = tokens.shift()
            const right = parseFactor()
            left = op === '+' ? left + right : left - right
        }

        return left
    }

    return parseSumSubs()
}

function evaluate(expr)
{
    const tokens = tokenise(expr)
    const result = parse(tokens)
    if (tokens.length > 0) throw new Error(`[SYNTAX ERROR] Sobraron los siguientes tokens: ${tokens.join(' ')}.`)
    return result
}

module.exports = {evaluate}