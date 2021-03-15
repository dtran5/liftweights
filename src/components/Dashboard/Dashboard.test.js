import { render, fireEvent} from '@testing-library/react';
import Dashboard from './Dashboard';

it("cardRenderCheck", () => {
    const { queryByTitle } = render(<Dashboard />);
    const card = queryByTitle("dashboardCard")
    expect(card).toBeTruthy()
}) 
