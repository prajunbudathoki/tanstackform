export function validatingUserName(username: string) {
    return new Promise<string | undefined>((resolve) => {
        console.log('Validating' + username)
        setTimeout(() => {
            resolve(
                ['ram','hello','raj'].includes(username) ? 'Username exists' : undefined
            )
        },1000)
    })
}