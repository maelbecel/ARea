import { NextPage } from "next";
import React, { useEffect } from "react";

const IndexPage: NextPage = () => {

    useEffect(() => {

        const downloadFile = async () => {
            const res = await fetch('apk/app.apk');
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', url);
            a.setAttribute('download', 'app.apk');
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        downloadFile();
    }, []);

    return (
        <div>
        </div>
    )
}

export default IndexPage;