import React, { useState } from 'react';
import { Box, Flex, Link, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Button } from '@chakra-ui/react';
import { FcCalendar, FcMoneyTransfer, FcHome, FcBusinessman, FcExport } from 'react-icons/fc';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = useSelector((state) => state.user.value);
  const navigate = useNavigate()

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login')    
    handleModalClose();
  };

  return (
    <Box display="flex" flexDirection="column">
      <Outlet />
      <Box as="footer" position="sticky" bottom="0" width="100%">
        <Flex
          align="center"
          justify="center"
          direction={{ base: 'column', md: 'row' }}
          bg="orange.400"
          color="white"
        >
          {data.isAdmin ? (
            <Flex mt={2}>
              <Link href="/admin" mx={{ base: '7', md: '20' }}>
                <Icon as={FcHome} boxSize={{ base: '10', md: '70px' }} />
              </Link>
              <Link href="/admin/absen" mx={{ base: '7', md: '20' }}>
                <Icon as={FcCalendar} boxSize={{ base: '10', md: '70px' }} />
              </Link>
              <Link href="/admin/salary" mx={{ base: '7', md: '20' }}>
                <Icon as={FcMoneyTransfer} boxSize={{ base: '10', md: '70px' }} />
              </Link>
            </Flex>
          ) : (
            <Flex mt={2}>
              <Link href="/" mx={{ base: '7', md: '20' }}>
                <Icon as={FcHome} boxSize={{ base: '10', md: '70px' }} />
              </Link>
              <Link href="/absen" mx={{ base: '7', md: '20' }}>
                <Icon as={FcCalendar} boxSize={{ base: '10', md: '70px' }} />
              </Link>
              <Link href="/salary" mx={{ base: '7', md: '20' }}>
                <Icon as={FcMoneyTransfer} boxSize={{ base: '10', md: '70px' }} />
              </Link>
            </Flex>
          )}
          <Link mx={{ base: '7', md: '20' }}>
            <Icon
              as={FcExport}
              boxSize={{ base: '10', md: '70px' }}
              onClick={handleModalOpen}
              cursor="pointer"
            />
          </Link>
        </Flex>
      </Box>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent bg="blue.900">
          <ModalHeader color="white">Logout</ModalHeader>
          <ModalBody color="white">
            Are you sure you want to log out?
          </ModalBody>
          <ModalFooter>
            <Button bg="orange.400" mr={3} onClick={handleLogout}>
              Logout
            </Button>
            <Button variant="ghost" bg="white" onClick={handleModalClose} color="blue.900">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
