import { BiEditAlt } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import { ContainerIconAction } from "./styled";
import { DataBody } from "../../layauts/table/Table";
import { DataTable } from "../../helpers/interface";

export const thead = ['Nombre', 'Apellido', 'Empresa', 'Email'];

export const tbody = (data: DataTable[], edit: (v: DataTable) => void, deleteProduct: (v: number, isModal: boolean) => void): DataBody => {

    return data.map((v, index): any => (
        [
            v.name, v.lastName, v.email, v.company,
            <div key={2} className='d-flex justify-content-center'>
                <ContainerIconAction
                    className='mr-3 pointer edit'
                    onClick={() => edit(v)}
                >
                    <BiEditAlt size={20} />
                </ContainerIconAction>

                <ContainerIconAction
                    className='pointer delete'
                    onClick={() => deleteProduct(index, true)}
                >
                    <IoCloseOutline size={20} />
                </ContainerIconAction>
            </div>
        ]
    ));
}