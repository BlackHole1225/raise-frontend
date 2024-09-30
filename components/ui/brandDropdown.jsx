import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown';
import { Button } from '@nextui-org/button';

export default function BrandDropdown({ data, label, icon, onSelectionChange }) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

  const selectedValue = React.useMemo(() => {
    const selectedLabels = Array.from(selectedKeys).map(
      (key) => data.find((item) => item.key === key)?.label
    );
    return selectedLabels.join(', ');
  }, [selectedKeys, data]);

  const handleSelectionChange = (keys) => {
    setSelectedKeys(keys);
    onSelectionChange(keys); // Call the parent's onSelectionChange function
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          className="capitalize rounded-full font-medium text-brand-olive-green border-brand-olive-green xl:py-6 xl:px-7 w-full"
          startContent={icon}
          size="lg"
          endContent={
            selectedKeys.size > 0 ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedKeys(new Set([]));
                  onSelectionChange(new Set([]));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="currentColor"
                    d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0zm0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01zm181.008-630.016c-12.496-12.496-32.752-12.496-45.248 0L512 466.752l-135.76-135.76c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248L466.736 512l-135.76 135.76c-12.496 12.48-12.496 32.769 0 45.249c12.496 12.496 32.752 12.496 45.264 0L512 557.249l135.76 135.76c12.496 12.496 32.752 12.496 45.248 0c12.496-12.48 12.496-32.769 0-45.249L557.248 512l135.76-135.76c12.512-12.512 12.512-32.768 0-45.248z"
                  />
                </svg>
              </button>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                <path
                  fill="currentColor"
                  fillRule="non-zero"
                  d="M13.069 5.157L8.384 9.768a.546.546 0 0 1-.768 0L2.93 5.158a.552.552 0 0 0-.771 0a.53.53 0 0 0 0 .759l4.684 4.61a1.65 1.65 0 0 0 2.312 0l4.684-4.61a.53.53 0 0 0 0-.76a.552.552 0 0 0-.771 0"
                />
              </svg>
            )
          }
        >
          {selectedKeys.size > 0 ? selectedValue : label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Multiple selection example"
        variant="flat"
        classNames={{
          base: 'max-h-[50vh] overflow-auto'
        }}
        closeOnSelect={false}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
      >
        {data?.map((item) => (
          <DropdownItem key={item?.key}>{item.label}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
