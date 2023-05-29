// Every time I have a new project I rewrite this implementation because I'm too lazy to find the old one

/**
 * A utility that makes composing class names easier.
 * 
 * @param classNames A list of class names or `false` values, where `false`
 * values will be omitted. Recommended conditional usage:
 * ```
 * classList('class-a', condition && 'class-b')
 * ```
 * @returns The final list of classes processed into one string.
 */
function classList(...classNames: (string | false)[]): string {
    return (
        classNames
            .filter(e => e !== false)
            .join(' ')
    );
}

export { classList };
