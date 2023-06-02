import sidebar from '@/components/layout/header/Sidebar.module.scss';

interface SidebarButtonProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

const SidebarButton = ({ showSidebar, toggleSidebar }: SidebarButtonProps) => {
  return (
    <div className={[sidebar['toggleButton'], showSidebar ? sidebar['active'] : ''].join(' ')} onClick={toggleSidebar}>
      <span />
      <span />
      <span />
    </div>
  );
};

export default SidebarButton;
