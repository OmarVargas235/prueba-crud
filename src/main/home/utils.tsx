import { BiEditAlt } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import { ContainerIconAction } from "./styled";
import { DataBody } from "../../layauts/table/Table";
import { DataTable } from "../../helpers/interface";
import { OptionsBadge } from "./interface";

export const thead = ['Nombre', 'Apellido', 'Empresa', 'Email', 'Rol', 'Acciones'];

export const tbody = (data: DataTable[], edit: (v: DataTable) => void, deleteUser: (v: string, isModal: boolean) => Promise<void>, id: string, role: 'USER' | 'ADMIN', isInactive: boolean): DataBody => {

    return data.map((v, index): any[] => (
        [
            v.name, v.lastName, v.email, v.company, v.role,
            <div key={2} className='d-flex justify-content-center'>
                {
                    (role === 'USER' || (v.role === 'ADMIN' && id !== v._id) || isInactive) ? null
                    : <>
                        <ContainerIconAction
                            className='mr-3 pointer edit'
                            onClick={() => edit(v)}
                        >
                            <BiEditAlt size={20} />
                        </ContainerIconAction>
                        
                        {
                            v.role === 'ADMIN'
                            ? <ContainerIconAction>
                                <IoCloseOutline size={20} className="d-none" />
                            </ContainerIconAction>
                            : <ContainerIconAction
                                className='pointer delete'
                                onClick={() => {void deleteUser(v._id, true)}}
                            >
                                <IoCloseOutline size={20} />
                            </ContainerIconAction>
                        }
                    </>
                }

            </div>
        ]
    ));
}

export const optionsBadges: OptionsBadge[] = [
    { name: 'Activos', id: 1 },
    { name: 'Inactivos', id: 2 },
];