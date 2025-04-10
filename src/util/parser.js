// A través de ésta vamos a aplicar un regex para terminar de dividir cada segmento del cálculo solicitado en tokens.
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
    // Administrar la parte del cálculo con paréntesis, o el manejo de tokens de operaciones en general.
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

    // Administrar potencias.
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

    // Administrar multiplicaciones o divisiones.
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

    // Administrar operaciones de suma y resta.
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

// Operación de evaluación general.
function evaluate(expr)
{
    // Inicialmente, tokenizar el cálculo...
    const tokens = tokenise(expr)
    // ...obtener el resultado...
    const result = parse(tokens)
    // En el caso de que sobre algún token (o caracter en general) devolver un error de sintaxis.
    if (tokens.length > 0) throw new Error(`[SYNTAX ERROR] Sobraron los siguientes tokens: ${tokens.join(' ')}.`)
    // Finalmente, devolver el resultado.
    return result
}

module.exports = {evaluate}