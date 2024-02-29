"use client";
import { InputText } from "primereact/inputtext";
import {
  aimag,
  duureg,
  country,
  vndes,
  garal,
  education,
  award,
  married,
  tsereg,
  tetgever,
  blood,
  driveLicence,
  para,
} from "../utils/Menu";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { use, useState } from "react";
import { UploadButton } from "./uploadThing";
import { LuLoader2 } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";

type DropdownOption = {
  title: string;
  // Add other properties if needed
};

const AddStudentForm = () => {
  const [selectedCity, setSelectedCity] = useState<DropdownOption | null>(null);
  const [selectedDistrict, setSelectedDistrict] =
    useState<DropdownOption | null>(null);
  const [selectedLivingCity, setSelectedLivingCity] =
    useState<DropdownOption | null>(null);
  const [selectedLivingDistrict, setSelectedLivingDistrict] =
    useState<DropdownOption | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<DropdownOption | null>(
    null
  );
  const [selectedVndes, setSelectedVndes] = useState<DropdownOption | null>(
    null
  );
  const [selectedGaral, setSelectedGaral] = useState<DropdownOption | null>(
    null
  );
  const [selectedEducation, setSelectedEducation] =
    useState<DropdownOption | null>(null);
  const [selectedAward, setSelectedAward] = useState<DropdownOption | null>(
    null
  );
  const [selectedBlood, setSelectedBlood] = useState<DropdownOption | null>(
    null
  );
  const [selectedMarried, setSelectedMarried] = useState<DropdownOption | null>(
    null
  );
  const [selectedTsereg, setSelectedTsereg] = useState<DropdownOption | null>(
    null
  );
  const [selectedDrive, setSelectedDrive] = useState<DropdownOption | null>(
    null
  );
  const [selectedPara, setSelectedPara] = useState<DropdownOption | null>(null);
  const [selectedTetgever, setSelectedTetgever] =
    useState<DropdownOption | null>(null);
  const [image, setImage] = useState("");
  const [imageIsDeleting, setImageIsDeleting] = useState(false);
  const [parentsName, setParentsName] = useState("");
  const [name, setName] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [date, setDate] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [sex, setSex] = useState("");
  const [irgenshil, setIrgenshil] = useState("");
  const [address, setAddress] = useState("");
  const [liveAddress, setLiveAddress] = useState("");
  const [importantPhoneNumber, setImportantPhoneNumber] = useState("");
  const [addressEmail, setAddressEmail] = useState("");
  const [email, setEmail] = useState("");
  const [bornAddress, setBornAddress] = useState("");
  const [profession, setProfession] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [description, setDescription] = useState("");
  const [drive, setDrive] = useState("");

  const handleImageDelete = (image: string) => {
    setImageIsDeleting(true);

    const imageKey = image.substring(image.lastIndexOf("/") + 1);

    const data = { imageKey };

    fetch("/api/uploadthing/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res: any) => res.json())
      .then((data) => {
        if (data.success) {
          setImage("");
          alert("File upload successful!");
        }
      })
      .catch(() => {
        alert("when file upload error");
      })
      .finally(() => {
        setImageIsDeleting(false);
      });
  };

  const handleSave = (e: any) => {
    e.preventDefault();

    console.log(selectedEducation);

    const data = {
      name: name,
      image: image,
      parentsName: parentsName,
      registerNumber: registerNumber,
      date: date,
      familyName: familyName,
      sex: sex,
      country: selectedCountry?.title,
      city: selectedCity?.title,
      district: selectedDistrict?.title,
      address: address,
      liveCity: selectedLivingCity?.title,
      liveDistrict: selectedLivingDistrict?.title,
      liveAddress: liveAddress,
      importantPhoneNumber: importantPhoneNumber,
      email: email,
      addressEmail: addressEmail,
      bornCountry: bornAddress,
      vndes: selectedVndes?.title,
      bornType: selectedGaral?.title,
      bornAddress: bornAddress,
      education: selectedEducation?.title,
      profession: profession,
      award: selectedAward?.title,
      passportNumber: passportNumber,
      married: selectedMarried?.title,
      tsereg: selectedTsereg?.title,
      tetgever: selectedTetgever?.title,
      description: description,
      blood: selectedBlood?.title,
      drive: drive,
      driveNumber: selectedDrive?.title,
      para: selectedPara?.title,
      irgenshil: irgenshil,
    };

    fetch("/api/student", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          alert("Amjilttai");
        } else {
          alert("Aldaa garlaa");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="">
        <h1 className="font-bold text-lg mb-10">Оюутан нэмэх</h1>

        <div className="w-full gap-20">
          <h1 className="text-center font-bold text-lg">
            Оюутны зураг оруулах
          </h1>
          <div className="flex flex-col mx-auto max-w-[400px] p-12 border-2 border-dashed border-primary/50 rounded mt-4">
            {image ? (
              <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4">
                <Image
                  fill
                  src={image}
                  alt="profile image"
                  className="object-contain"
                />

                <button
                  onClick={() => handleImageDelete(image)}
                  type="button"
                  className="absolute right-[-12px]"
                >
                  {imageIsDeleting ? <LuLoader2 /> : <IoMdClose />}
                </button>
              </div>
            ) : (
              <>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res: any) => {
                    setImage(res[0].url);

                    console.log("Files: ", res);
                    alert("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </>
            )}
          </div>

          <h1 className="font-bold text-lg mb-10">Үндсэн мэдээлэл</h1>
          <div className="grid grid-cols-2 gap-20">
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Эцэг(эх)-ийн нэр</label>
              <InputText
                onChange={(e) => setParentsName(e.target.value)}
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Нэр</label>
              <InputText
                onChange={(e) => setName(e.target.value)}
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Регистрийн дугаар</label>
              <InputText
                onChange={(e) => setRegisterNumber(e.target.value)}
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Төрсөн огноо</label>
              <InputText
                onChange={(e) => setDate(e.target.value)}
                type="date"
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Ургийн овог</label>
              <InputText
                onChange={(e) => setFamilyName(e.target.value)}
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Хүйс</label>
              <InputText
                onChange={(e) => setSex(e.target.value)}
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="username">Иргэншил</label>
              <InputText
                onChange={(e) => setIrgenshil(e.target.value)}
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
          </div>
          <h1 className="font-bold text-lg my-10">Үндсэн харьяалал</h1>
          <div className="grid grid-cols-2 gap-20">
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Аймаг/нийслэл</label>

              <Dropdown
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.value)}
                options={aimag}
                optionLabel="title"
                editable
                placeholder="Сонгох"
                className="w-full md:w-14rem"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="username">Сум/дүүрэг</label>

              <Dropdown
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.value)}
                options={duureg}
                optionLabel="title"
                editable
                placeholder="Сонгох"
                className="w-full md:w-14rem"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="username">Бүртгэлтэй хаяг</label>
              <InputText
                onChange={(e) => setAddress(e.target.value)}
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
          </div>

          <h1 className="font-bold text-lg my-10">
            Оршин суугаа хаяг, холбоо барих
          </h1>
          <div className="grid grid-cols-2 gap-20">
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Аймаг/нийслэл</label>

              <Dropdown
                value={selectedLivingCity}
                onChange={(e) => setSelectedLivingCity(e.value)}
                options={aimag}
                optionLabel="title"
                editable
                placeholder="Сонгох"
                className="w-full md:w-14rem"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Сум/дүүрэг</label>

              <Dropdown
                value={selectedLivingDistrict}
                onChange={(e) => setSelectedLivingDistrict(e.value)}
                options={duureg}
                optionLabel="title"
                editable
                placeholder="Сонгох"
                className="w-full md:w-14rem"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Гэрийн хаяг</label>
              <InputText
                onChange={(e) => setLiveAddress(e.target.value)}
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Яаралтай үед холбоо барих</label>
              <InputText
                onChange={(e) => setImportantPhoneNumber(e.target.value)}
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Шуудангийн хаяг</label>
              <InputText
                onChange={(e) => setAddressEmail(e.target.value)}
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Имэйл</label>
              <InputText
                onChange={(e) => setEmail(e.target.value)}
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
          </div>
          <h1 className="font-bold text-lg my-10">Төрсөн газар, үндэс угсаа</h1>
          <div className="grid grid-cols-2 gap-20">
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Улс</label>

              <Dropdown
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.value)}
                options={country}
                optionLabel="title"
                editable
                placeholder="Сонгох"
                className="w-full md:w-14rem"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Яс үндэс</label>
              <Dropdown
                value={selectedVndes}
                onChange={(e) => setSelectedVndes(e.value)}
                options={vndes}
                optionLabel="title"
                editable
                placeholder="Сонгох"
                className="w-full md:w-14rem"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Нийгмийн гарал</label>
              <Dropdown
                value={selectedGaral}
                onChange={(e) => setSelectedGaral(e.value)}
                options={garal}
                optionLabel="title"
                editable
                placeholder="Сонгох"
                className="w-full md:w-14rem"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Төрсөн газар</label>
              <InputText
                onChange={(e) => setBornAddress(e.target.value)}
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
          </div>
          <h1 className="font-bold text-lg my-10">Мэргэжил, боловсрол</h1>
          <div className="grid grid-cols-2 gap-20">
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Боловсрол</label>
              <Dropdown
                value={selectedEducation}
                onChange={(e) => setSelectedEducation(e.value)}
                options={education}
                optionLabel="title"
                editable
                placeholder="Сонгох"
                className="w-full md:w-14rem"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Мэргэжил</label>
              <InputText
                onChange={(e) => setProfession(e.target.value)}
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Эрдмийн цол зэрэг</label>
              <Dropdown
                value={selectedAward}
                onChange={(e) => setSelectedAward(e.value)}
                options={award}
                optionLabel="title"
                editable
                placeholder="Сонгох"
                className="w-full md:w-14rem"
              />
            </div>
          </div>
          <h1 className="my-10 font-bold text-lg">Бусад</h1>

          <div className="grid grid-cols-2 gap-20">
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Гадаад паспортын дугаар</label>
              <InputText
                onChange={(e) => setPassportNumber(e.target.value)}
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Гэрлэлтийн байдал</label>
              <Dropdown
                value={selectedMarried}
                onChange={(e) => setSelectedMarried(e.value)}
                options={married}
                optionLabel="title"
                editable
                placeholder="Сонгох"
                className="w-full md:w-14rem"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Цэргийн алба хаасан эсэх</label>
              <Dropdown
                value={selectedTsereg}
                onChange={(e) => setSelectedTsereg(e.value)}
                options={tsereg}
                optionLabel="title"
                editable
                placeholder="Сонгох"
                className="w-full md:w-14rem"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Тэтгэвэр тогтоосон эсэх</label>
              <Dropdown
                value={selectedTetgever}
                onChange={(e) => setSelectedTetgever(e.value)}
                options={tetgever}
                optionLabel="title"
                editable
                placeholder="Сонгох"
                className="w-full md:w-14rem"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Нэмэлт тайлбар</label>
              <InputText
                onChange={(e) => setDescription(e.target.value)}
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Цусны бүлэг</label>
              <Dropdown
                value={selectedBlood}
                onChange={(e) => setSelectedBlood(e.value)}
                options={blood}
                optionLabel="title"
                editable
                placeholder="Сонгох"
                className="w-full md:w-14rem"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Жолооны ангилал</label>
              <Dropdown
                value={selectedDrive}
                onChange={(e) => setSelectedDrive(e.value)}
                options={driveLicence}
                optionLabel="title"
                editable
                placeholder="Сонгох"
                className="w-full md:w-14rem"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Жолооны үнэмлэхний дугаар</label>
              <InputText
                onChange={(e) => setDrive(e.target.value)}
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Хөгжлийн бэрхшээлтэй эсэх</label>
              <Dropdown
                value={selectedPara}
                onChange={(e) => setSelectedPara(e.value)}
                options={para}
                optionLabel="title"
                editable
                placeholder="Сонгох"
                className="w-full md:w-14rem"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center  mx-auto my-10 text-center bg-mainColor text-white w-max p-2 rounded-md hover:bg-blue-500">
          <Button onClick={handleSave} label="Хадгалах" />
        </div>
      </div>
    </>
  );
};

export default AddStudentForm;
