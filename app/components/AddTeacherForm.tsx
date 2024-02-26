"use client";
import { InputText } from "primereact/inputtext";
import { menu, aimag, duureg } from "../utils/Menu";
import Link from "next/link";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
const AddTeacherForm = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedLivingCity, setSelectedLivingCity] = useState(null);
  const [selectedLivingDistrict, setSelectedLivingDistrict] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedBornCity, setSelectedBornCity] = useState(null);
  const [selectedBornDistrict, setSelectedBornDistrict] = useState(null);
  const [selectedVndes, setSelectedVndes] = useState(null);
  const [selectedGaral, setSelectedGaral] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedAward, setSelectedAward] = useState(null);
  const [selectedBlood, setSelectedBlood] = useState(null);
  const [selectedMarried, setSelectedMarried] = useState(null);
  const [selectedTsereg, setSelectedTsereg] = useState(null);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [selectedPara, setSelectedPara] = useState(null);
  const [selectedTetgever, setSelectedTetgever] = useState(null);
  return (
    <>
      <div className="flex gap-10">
        <div className="flex flex-col gap-5 text-[15px]">
          {menu.map((el) => (
            <Link key={el.title} href="">
              {el.title}
            </Link>
          ))}
        </div>

        <div className="w-full gap-20">
          <h1 className="font-bold text-lg mb-10">Үндсэн мэдээлэл</h1>
          <div className="grid grid-cols-2 gap-20">
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Эцэг(эх)-ийн нэр</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Нэр</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Регистрийн дугаар</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Төрсөн огноо</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Ургийн овог</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Хүйс</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="username">Иргэншил</label>
              <InputText
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
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Яаралтай үед холбоо барих</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Шуудангийн хаяг</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Имэйл</label>
              <InputText
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
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Яс үндэс</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Нийгмийн гарал</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Төрсөн газар</label>
              <InputText
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
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Мэргэжил</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Эрдмийн цол зэрэг</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
          </div>
          <h1 className="my-10 font-bold text-lg">Бусад</h1>

          <div className="grid grid-cols-2 gap-20">
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Гадаад паспортын дугаар</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Гэрлэлтийн байдал</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Цэргийн алба хаасан эсэх</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Тэтгэвэр тогтоосон эсэх</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Нэмэлт тайлбар</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Цусны бүлэг</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Жолооны ангилал</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Жолооны үнэмлэхний дугаар</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Хөгжлийн бэрхшээлтэй эсэх</label>
              <InputText
                id="username"
                aria-describedby="username-help"
                className="border border-gray-500 "
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card flex justify-center text-center mx-auto p-2  my-10 bg-mainColor text-white w-max hover:bg-blue-500">
        <Button label="Хадгалах" />
      </div>
    </>
  );
};

export default AddTeacherForm;
