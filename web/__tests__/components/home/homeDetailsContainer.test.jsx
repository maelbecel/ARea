import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import HomeDetailsContainer from '../../../components/HomePage/Container/HomeDetailsContainer.tsx'

test('displays the main title', () => {
    // ARRANGE
    render(<HomeDetailsContainer />);

    // ACT

    // ASSERT
    expect(screen.getByText('There are unlimited ways to save time')).toBeInTheDocument();
});

test('displays the feature title', () => {
    // ARRANGE
    render(<HomeDetailsContainer />);

    // ACT

    // ASSERT
    expect(screen.getByText('Cross post to multiple social networks')).toBeInTheDocument();
});

test('displays the feature description', () => {
    // ARRANGE
    render(<HomeDetailsContainer />);

    // ACT

    // ASSERT
    expect(screen.getByText('Save time by writing once and posting to multiple networks automatically.')).toBeInTheDocument();
});