// 1.- Librerias
import { useState, useEffect, ChangeEvent } from 'react';

// 2.- components
import TextField from '../textField/TextField';
import Button from '../button/Button';
import Select, { IOption } from '../select/Select';
import { Text } from '../Text';

// 3.- Estilos
import { Container, Thead, Th, TBody, Tr, Td, BoxNumberPaginate } from './styled';

// 4.- iconos
import { AiOutlineSearch } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";

export type DataBody = Array<Array<string | number | JSX.Element>>;

interface Props {
    thead: string[];
    tbody: DataBody;
    width: string;
    alignHead?: 'left' | 'center' | 'right';
    alignBody?: 'left' | 'center' | 'right';
    refresh: () => void;
    addUser: () => void;
    isNewUser?: boolean;
}

enum ValuesDefault {
    init = 1,
    end = 10
}

const Table = ({ thead, tbody, width, alignHead='center', alignBody='center', refresh, addUser, isNewUser=false }: Props): JSX.Element => {

    const [currentTotal, setCurrentTotal] = useState<number>(ValuesDefault.end);
    const [init, setInit] = useState<number>(ValuesDefault.init);
    const [end, setEnd] = useState<number>(ValuesDefault.end);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(ValuesDefault.init);
    const [dataBody, setDataBody] = useState<DataBody>([]);
    const [search, setSeacrh] = useState<string>('');
    
    useEffect(() => {

        const totalPage = Math.ceil(dataBody.length / currentTotal);
        setTotalPage(totalPage);

    }, [currentTotal, dataBody]);

    useEffect(() => setDataBody(tbody), [tbody]);

    const step = (n: number): void => {

        const nInit = currentTotal * n - currentTotal;
        const nEnd = currentTotal * n;

        setInit(nInit+1);
        setEnd(nEnd);
        setCurrentPage(n);
    }

    const prev = (): void => {

        const prev = currentPage-1;
        const nInit = init - 1 - currentTotal;
        const nEnd = end- currentTotal;
        
        setInit(nInit+1);
        setEnd(nEnd);
        setCurrentPage(prev);
    }

    const next = (): void => {

        const next = currentPage+1;
        const nInit = currentPage * currentTotal;
        const nEnd = next * currentTotal;

        setInit(nInit+1);
        setEnd(nEnd);
        setCurrentPage(next);
    }

    const handleSelect = (e: IOption): void => {

        setCurrentTotal(Number(e.value));
        setEnd(Number(e.value));
        
        setCurrentPage(ValuesDefault.init);
        setInit(ValuesDefault.init);
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {

        const text: string = e.target.value.toLowerCase().trim();

        const filter = tbody.filter(arr => {

            const sliceLastElement = arr.slice(0, -1);
            const copyArr: string[] = JSON.parse(JSON.stringify(sliceLastElement));

            return copyArr.filter(v => v == null
                ? false
                : v.toLowerCase().trim().includes(text)
            ).length > 0;
        });

        setSeacrh(text);
        setDataBody(filter);
        setInit(1);
        setCurrentPage(1);
        setEnd(currentTotal);
    }

    return <Container className='p-4'>
        <div className='d-flex justify-content-between align-items-center mb-4 container-header'>
            <TextField
                handleChange={handleSearch}
                name='search'
                value={search}
                icon={<AiOutlineSearch size={25} color='#EE3A57' />}
                edge="start"
                classesContainerInput='border-radius'
            />

            <div className='d-flex container-buttons'>
                {
                    isNewUser
                    ? <Button classes='mr-2' handleClick={() => addUser()}>Nuevo usuario</Button>
                    : null
                }

                <Button
                    handleClick={() => refresh()}
                    edge='end'
                    icon={<BiRefresh size={18} />}
                >Refrescar</Button>
            </div>
        </div>
        
        <div className='d-flex justify-content-center'>
            <div className='container-table'>
                <Thead
                    columns={thead.length}
                    align={alignHead}
                    widthGrid={width}
                >
                    {
                        thead.map((v, index) => (
                            <Th
                                key={index}
                                className='p-2'
                                isFirst={index === 0}
                                isLast={index === thead.length -1}
                            >{v}</Th>
                        ))
                    }
                </Thead>

                <TBody>
                    {
                        dataBody.slice(init-1, end).map(((row, index) => (
                            <Tr
                                key={index}
                                columns={row.length}
                                align={alignBody}
                                widthGrid={width}
                            >
                                {
                                    row.map((v, index) => (
                                        <Td
                                            key={index}
                                            className='py-2'
                                        >{v}</Td>
                                    ))
                                }
                            </Tr>
                        )))
                    }
                </TBody>
            </div>
        </div>

        <div className='d-flex align-items-start justify-content-between mt-4 container-footer'>
            <Select
                options={[
                    { label: '10', value: 10 },
                    { label: '25', value: 25 },
                    { label: '50', value: 50 },
                    { label: '100', value: 100 },
                ]}
                handleChange={handleSelect}
                className='mr-1'
            />

            <Text
                size='14px'
                color='white'
            >Mostrando registros del {init} al {currentPage === totalPage ? dataBody.length : end} de un total de {dataBody.length} registros</Text>

            <div className='d-flex align-items-center'>
                <Button
                    classes='btn-table'
                    handleClick={prev}
                    disabled={currentPage === ValuesDefault.init}
                >Anterior</Button>
                
                <div className='d-flex mx-1'>
                    {
                        new Array(totalPage).fill(1).map((v, index) => (
                            <BoxNumberPaginate
                                key={index}
                                onClick={() => step(index+1)}
                                isCurrent={(index+1)*currentTotal === end}
                            >{index+1}</BoxNumberPaginate>
                        ))
                    }
                </div>

                <Button
                    classes='btn-table'
                    handleClick={next}
                    disabled={currentPage === totalPage || totalPage === 0}
                >Siguiente</Button>
            </div>
        </div>
    </Container>
}

export default Table;