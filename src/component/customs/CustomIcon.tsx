import Icon, { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

interface CustomAntdIconProps extends CustomIconComponentProps {
  icon: string;
}
const CustomIcon:React.FC<CustomAntdIconProps>= ({ icon},props) => (
    <Icon component={()=><i className={icon} />} {...props} />
  );
  export default CustomIcon