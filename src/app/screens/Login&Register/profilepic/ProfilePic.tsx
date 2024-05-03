import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { responsiveHeight as rh } from 'react-native-responsive-dimensions';
import UploadImgModal from './UploadImgModal';
import {Image as ImageInterface } from '@/context/loginFeatures/imageSlice'
import { Icon } from '@/components/Themed';
import { RegularText } from '@/components/StyledText';

interface ProfileProps {
  image?: ImageInterface | null;
}

const ProfilePic: React.FC<ProfileProps> = ({ image }) => {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);

  return (
    <>
      <View style={styles.profileborder}>
        <View style={styles.profile}>
          {image ? (
            <Image source={{ uri: image?.uri }} style={styles.profileImage} testID='profile-image' />
          ) : (
            <Icon type="AntIcons" name="user" size={54} testID='profile-icon' />
          )}
        </View>

        <TouchableOpacity onPress={() => setUploadModalOpen(true)} style={styles.editicon} testID='edit-button'>
          <Icon type="AntIcons" size={18} name="edit" />
        </TouchableOpacity>
      </View>
      <RegularText style={styles.usernameText}>Username</RegularText>

      <UploadImgModal openModal={isUploadModalOpen} setOpenModal={setUploadModalOpen} onImageSelected={() => setUploadModalOpen(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  profile: {
    borderRadius: 50,
    width: 85,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileborder: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 95,
    height: 95,
    borderWidth: 1,
    borderColor: '#fff',
    alignSelf: 'center',
    marginTop: rh(3),
  },
  editicon: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  usernameText: {
    textAlign: 'center',
    opacity: 0.5,
    paddingTop: 5,
  },
});

export default ProfilePic;