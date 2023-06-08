import { Modal } from 'components';
import React from 'react'

const Index = ({ footer, _CloseAccessModal, access, Permissions, handleAccessChange, modalTitle }) => {
    return (
        <Modal
            _Toggle={_CloseAccessModal}
            title={modalTitle}
            body={(
                <div className="flex w-full justify-center items-center">
                    <div className="grid grid-cols-2 gap-6">
                        {
                            access.map(({ name, value }, index) => (
                                <div key={index}>
                                    <label className="inline-flex items-center">
                                        <input
                                            name={name}
                                            type="checkbox"
                                            checked={value}
                                            value={name}
                                            className="form-checkbox"
                                            onChange={(e) => handleAccessChange(e)}
                                        />
                                        <span className="ml-2">{Permissions[index]}</span>
                                    </label>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
            footer={(
                footer
            )}
        />
    )
}
export default Index;
