import { useState, useEffect } from "react";
import { isPlatform } from "@ionic/react";

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Storage } from "@capacitor/storage";
import { Capacitor } from "@capacitor/core";

export function usePhotoGallery() {
    const [photos, setPhotos] = useState<UserPhoto[]>([]);
    const takePhoto = async () => {
        const cameraPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });
        const fileName = new Date().getTime() + ".jpeg";
        const newPhotos = [
            {
                filepath: fileName,
                webviewPath: cameraPhoto.webPath,
            },
            ...photos,
        ];
        setPhotos(newPhotos);
    };
    
  
    return {
        photos,
        takePhoto,
    };
}

export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
}