import SelectLanguage from "../SelectLanguage/SelectLanguage";
import Switch from "../Switch";

const UserActions: React.FC = () => {
  return (
    <div className="self-stretch flex items-center gap-4 justify-start my-auto">
      <SelectLanguage />
      <Switch />
    </div>
  );
};

export default UserActions;
