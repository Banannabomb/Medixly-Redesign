import * as ImagePicker from "expo-image-picker";

export interface Scan {
  id: number;
  image: ImagePicker.ImageInfo;
  date: string;
  diagnosis: string;
  note: string;
}

export interface Doctor {
  id: number;
  name: string;
  emails: [
    {
      email: string;
    }
  ];
  phoneNumbers: [
    {
      number: string;
    }
  ];
}
