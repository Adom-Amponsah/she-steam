import Header from '../../components/Header';

export default function MentorsLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
