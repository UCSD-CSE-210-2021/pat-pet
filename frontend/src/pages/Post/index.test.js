import { render, screen } from '@testing-library/react';
import PostPage from './index'

describe('Post page', () => {
    it('test post page', () => {
        render(<PostPage />);
        const onFinish = jest.fn();
        const wrapper = shallow(<PostPage {...defaultProps} onFinish={onFinish} />);
        wrapper.find('ForwardRef(InternalForm)').props().onFinish(values);
        expect(onFinish).toHaveBeenCalled();
    });
});