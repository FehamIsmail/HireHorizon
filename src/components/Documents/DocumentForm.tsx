import React, {useEffect, useState} from 'react'
import {Document, StatusType} from '../../constants/types'
import * as utils from '../../scripts/DocumentUtils'


const empty_document:Document = {
    type: '',
    id: '',
    file: '',
    title: '',
    default: false
}

interface DocumentProps {
    action: 'EDIT' | 'CREATE'
    documentOnPreview?: Document
    type?: 'CV' | 'LETTER' | 'APP_PKG'
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>
    resumeList: Document[]
    letterList: Document[]
}

export const DocumentForm = (props:DocumentProps) => {
    const {type, action, documentOnPreview, setStatus, letterList, resumeList} = props
    const [documentInfo, setDocumentInfo] = useState<Document>(documentOnPreview || empty_document)
    const [hasCoverLetter, setHasCoverLetter] = useState<boolean>(false)

    useEffect(() => {
        setDocumentInfo(documentOnPreview || empty_document)
    }, [documentOnPreview]);

    const handleCreate = (e: any) => {
        console.log(documentInfo)

        // e.preventDefault()
        // if(!isTypeAndFileValid())
        //     return
        const data = createDataToSend()
        console.log(data)
        //
        //
        setStatus({type: 'success', message: 'Document successfully created'})
        // Add document to documents from local storage
        localStorage.setItem('documents', JSON.stringify([...JSON.parse(localStorage.getItem('documents') || '[]'), data]))
        //
        window.location.reload()
    }

    const handleEdit = (e: any) => {
        e.preventDefault()
        const id = documentInfo.id
        if(!isTypeAndFileValid())
            return
        const data = createDataToSend()
        console.log(data)
    }

    function isTypeAndFileValid(){
        if(documentInfo.type == ''){
            alert('Please select a document type')
            return false
        }
        if(!documentInfo.file){
            alert('No file chosen')
            return false
        }
        return true
    }

    function createDataToSend(){
        let data
        if(documentInfo.type === 'APP_PKG'){
            data = {
                title: documentInfo.title,
                default: documentInfo.default,
                cv: documentInfo.cv,
                cover_letter: documentInfo.cover_letter,
                type: documentInfo.type
            }
        }
        else data = {
            title: documentInfo.title,
            default: documentInfo.default,
            cv: documentInfo.type == 'CV' ? (documentInfo.file as unknown as File).name : null,
            cover_letter: documentInfo.type == 'LETTER' ? (documentInfo.file as unknown as File).name : null,
            type: documentInfo.type,
            file: (documentInfo.file as unknown as File).name
        };

        return data
    }

    useEffect(() => {
    }, []);

    return (
        <>
        <div className="px-4 py-3 sm:px-6">
            <h3 className="mt-4 text-base font-semibold leading-6 text-gray-900">{action  == 'EDIT' ? 'Edit' : 'Upload'} a Document</h3>
            <div>
                <div className="mt-6 grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            value={documentInfo.title}
                            onChange={e => utils.handleDocumentInputChange(e, setDocumentInfo)}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    {documentInfo.type == 'APP_PKG' &&
                        <div className="col-span-6">
                            <label htmlFor="cv" className="block text-sm font-medium text-gray-700">
                                Choose a CV
                            </label>
                        <select
                            name="cv"
                            id="cv"
                            onChange={e => utils.handleDocumentSelectChange(e, setDocumentInfo)}
                            value={documentInfo.cv || ''}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">-- Select --</option>
                            {resumeList.map((item, index) => (
                                <option key={index} value={item.title}>
                                    {`${item.file?.split('/').pop()} (${item.title})`}
                                </option>
                            ))}
                        </select>
                    </div>}
                    {documentInfo.type == 'APP_PKG' &&
                        <div className={`col-span-6`}>
                            <div className={`${!hasCoverLetter ? '' : 'hidden'}`}>
                                <label htmlFor="cover_letter" className="block text-sm font-medium text-gray-700">
                                    Choose a Cover Letter
                                </label>
                                <select
                                    name="cover_letter"
                                    id="cover_letter"
                                    onChange={e => utils.handleDocumentSelectChange(e, setDocumentInfo)}
                                    value={documentInfo.cover_letter || ''}
                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="">-- Select --</option>
                                    {letterList.map((item, index) => (
                                        <option key={index} value={item.title}>
                                            {`${item.file?.split('/').pop()} (${item.title})`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-1 col-span-6 flex items-center">
                                <input
                                    id="hasCoverLetter"
                                    name="hasCoverLetter"
                                    type="checkbox"
                                    checked={hasCoverLetter}
                                    size={2000000}
                                    onChange={e => setHasCoverLetter(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                    htmlFor="hasCoverLetter"
                                    className="ml-2 block text-xs text-gray-900"
                                >
                                    <span>No <b className="font-[400]">Cover Letter?</b></span>
                                </label>
                            </div>
                        </div>}
                    { action === 'CREATE' && <div className="col-span-6">
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            Type
                        </label>
                        <select
                            name="type"
                            id="type"
                            onChange={e => utils.handleDocumentInputChange(e, setDocumentInfo)}
                            value={documentInfo.type || ''}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">-- Select --</option>
                            <option value="CV">Resume</option>
                            <option value="LETTER">Cover Letter</option>
                            <option value="APP_PKG">Application Package</option>
                        </select>
                    </div>}

                    {documentInfo.type != 'APP_PKG' && <div className="col-span-6">
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                            Document
                        </label>
                        <input
                            type="file"
                            name="file"
                            id="file"
                            accept=".pdf"
                            required
                            onChange={e => utils.handleDocumentInputChange(e, setDocumentInfo)}
                            className="mt-1  relative m-0 block w-full min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700  ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:text-white file:rounded-none file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:[margin-inline-end:0.75rem] file:bg-primary file:cursor-pointer file:[border-inline-end-width:1px] hover:file:bg-primary_dark focus:border-primary focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none"
                            aria-describedby="file_input_help"
                        />
                        <p className="mt-1 text-xs text-gray-800" id="file_input_help">PDF ONLY (MAX. 2MB).</p>
                    </div>}

                    <div className="col-span-6 flex items-center">
                        <input
                            id="default"
                            name="default"
                            type="checkbox"
                            checked={documentInfo.default}
                            accept=".pdf"
                            size={2000000}
                            onChange={e => utils.handleDocumentInputChange(e, setDocumentInfo)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                            htmlFor="default"
                            className="ml-2 block text-sm text-gray-900"
                        >
                            <span className="text-base">Is <b className="font-[500]">Default?</b></span>
                        </label>
                    </div>

                </div>
            </div>
        </div>
        <div className="mt-4 bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
                type="submit"
                onClick={action == 'EDIT' ? handleEdit : handleCreate}
                className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary_dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                {action == 'EDIT' ? 'Save' : 'Upload'}
            </button>
        </div>
    </>
    );
};