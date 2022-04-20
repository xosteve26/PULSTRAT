import React from "react";
import {Page, Text, View, Document,Image, StyleSheet} from "@react-pdf/renderer";
import img from "../../public/images/logo.png";



const PDFFile = () => {
    <Document>
        <Page class="h-[297mm]w-[210mm]p-12 pl-32">
            <Text>
                <p class="pb-2 text-4xl">MB Road apples</p>
                <p class="text-sm text-gray-400">4520 Wood Duck Drive</p>
                <p class="text-sm text-gray-400">Marquette Michigan 49855</p>
            </Text>
            <div>
                <Image src={img} /> 
            </div>
            
            <Text>

            </Text>
        </Page>
    </Document>
}



export default PDFFile;