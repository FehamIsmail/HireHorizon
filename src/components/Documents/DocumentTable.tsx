import React, {useEffect, useState} from 'react'
import {Document, StatusType} from "../../constants/types";
import {ArrowDownTrayIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {shortenFileName} from "../../scripts/utils";

export interface DocumentTableProps {
    documentList: Document[] | any[]
    editDocument: (doc: Document) => any;
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>
}


export default function DocumentTable(props:DocumentTableProps) {
    const {documentList, editDocument, setStatus} = props
    const type = documentList[0]?.type
    const documentTypeName = type == 'CV' ? 'Resumes' :
        type == 'LETTER' ? 'Cover Letters' : 'Application Packages'
    const [defaultDocument, setDefaultDocument] = useState<Document | null>(null);

    const handleDefaultChange = (document: Document) => {
        if (defaultDocument === document) {
            // Uncheck the radio button if it was already selected
            setDefaultDocument(null);
            document.default = false;
        } else {
            // Check the radio button and uncheck the previously selected default document
            setDefaultDocument(document);
            documentList.forEach((doc) => {
                if (doc === defaultDocument) {
                    doc.default = false;
                }
            });
            document.default = true;
        }
    };

    const deleteDocument = (doc: Document) => {
        const id = doc.id;

        setStatus({type: 'success', message: 'Document deleted'})
        window.location.reload()

        setStatus({type:'error', message:'Ensure that these requirements are met:', messages: ['unknown error']})

    }

    const downloadDocument = async (url: string, fileName: string) => {
          // Download the file
    }

    const handleSave = () => {
        if(!defaultDocument)
            return
        const data = {default: true}
        const id = defaultDocument.id

        window.location.reload()
        console.log('error')
    }

    useEffect(() => {
        documentList.forEach(doc => {
            if(doc.default)
                setDefaultDocument(doc)
        })
    }, [documentList]);

    return (
        <div className="">
            <div className="px-4 sm:px-6 lg:px-8 mt-6 sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">{documentTypeName}</h1>
                </div>
            </div>
            <div className="px-4 sm:px-6 lg:px-8 mt-6 flow-root">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-0 w-full py-2 align-middle px-0 sm:px-2 md:px-0">
                        <table className="w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th scope="col" className="py-3.5 px-3 text-center w-24 text-sm font-semibold text-gray-900">
                                    Default
                                </th>
                                <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                    Title
                                </th>
                                {type == 'APP_PKG' ?
                                    <>
                                        <th scope="col" key="1" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                            Resume
                                        </th>
                                        <th scope="col" key="2" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                            Cover Letter
                                        </th>
                                    </>
                                    :
                                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                        File Name
                                    </th>
                                }

                                <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                    Type
                                </th>
                                <th scope="col" className="py-3.5 px-3 text-center text-sm font-semibold text-gray-900">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {documentList.map((document) => (
                                <tr key={document.id}>
                                    <td className="whitespace-nowrap py-4 flex justify-center text-sm font-medium mx-auto text-gray-900 sm:pl-0">
                                        <input
                                            type="radio"
                                            name="default"
                                            checked={document === defaultDocument}
                                            onChange={() => handleDefaultChange(document)}
                                        />
                                    </td>
                                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{document.title}</td>
                                    {type !== 'APP_PKG' && <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500"
                                                               title={document.file?.split('/').pop()}>
                                        {shortenFileName(document.file?.split('/').pop(), 50)}</td>}
                                    {type === 'APP_PKG' && <>
                                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500" title={document.file?.curriculum_vitae?.split('/').pop()}
                                        >{shortenFileName(document.file.curriculum_vitae?.split('/').pop())}</td>
                                    <td className={`whitespace-nowrap py-4 px-3 text-sm text-gray-500 ${document.cover_letter?.cover_letter ? '' : 'font-[400] text-red-900'}`} title={document.cover_letter?.cover_letter?.split('/').pop()}
                                        >{shortenFileName(document.cover_letter?.cover_letter?.split('/').pop() || 'No Cover Letter')}</td></>}
                                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{document.type}</td>
                                    <td className="relative whitespace-nowrap p-4 text-center text-sm font-medium flex items-center justify-center gap-2 ">
                                        {type != 'APP_PKG' &&
                                        <button onClick={() => downloadDocument(document.file, document.file?.split('/').pop())}>
                                            <ArrowDownTrayIcon className="h-4 w-4 text-indigo-600 hover:text-indigo-900"/>
                                        </button>}
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900"
                                            onClick={() => editDocument(document)}>
                                            Edit
                                        </button>
                                        <button onClick={() => deleteDocument(document)}>
                                            <XMarkIcon className="h-4 w-4 text-red-600 hover:text-red-900"/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="mt-4 bg-gray-50 py-3 text-right sm:px-6">
                <button
                    type="submit"
                    onClick={handleSave}
                    className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary_dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Save
                </button>
            </div>
        </div>
    )
}
