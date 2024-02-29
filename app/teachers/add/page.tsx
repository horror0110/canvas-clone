import AddTeacherForm from "@/app/components/AddTeacherForm";
import Container from "@/app/components/Container";
import { menu } from "@/app/utils/Menu";
import Link from "next/link";

const AddTeacherPage = () => {
  return (
    <Container>
      <div className="flex gap-10">
        <div className="flex flex-col gap-5 text-[15px]">
          {menu.map((el) => (
            <Link key={el.title} href="">
              {el.title}
            </Link>
          ))}
        </div>

        <AddTeacherForm />
      </div>
    </Container>
  );
};

export default AddTeacherPage;
