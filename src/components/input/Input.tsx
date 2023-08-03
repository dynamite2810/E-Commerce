import { Input as InputAnt, InputProps } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import styled from 'styled-components';


interface IInputProps extends InputProps {
  className?: any;
}

const Input = ({ className, type, ...rest }: IInputProps) => {
  if (type === 'password')
    return (
      <InputPassword
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        {...rest}
      />
    );
  return <InputAntCustom type={type || 'text'} {...rest} />;
};


const InputPassword = styled(InputAnt.Password)`
  & .ant-input{
    background-color: #D9D9D9 !important;
  },
`

const InputAntCustom = styled(InputAnt)`
  & .ant-input{
    background-color: #D9D9D9 !important;
  },
`

export default Input;
