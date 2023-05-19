# COMO USAR EL HOOK

## useMediaQuery

```sh
import { useMediaQuery } from 'hooks/useMediaQuery';

const Component = (): JSX.Element => {

    const matches1 = useMediaQuery('(min-width:600px)');
    const matches2 = useMediaQuery('(max-width:600px)');
    
    return <>
        <span>{matches1 ? 'matches1' : null}</span>
        <span>{matches2 ? 'matches2' : null}</span>
    </>;
}
```