import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import copy from 'copy-to-clipboard';
import {
  MdArrowDropUp,
  MdArrowDropDown,
  MdChatBubbleOutline,
  MdShare, MdLabelOutline, MdExpandLess, MdExpandMore,
  MdComment,
} from 'react-icons/md';
import PostInformation from './PostInformation';
import ExpandedCardContent from './CardExpandedContent';
import { regexFilters } from '../../../helpers';
import { ActionsBar, ActionItem } from '../../styles';
import {
  CardContainer,
  ContentArea,
  DetailsRow,
  ContentRow,
  ContentTitle,
  ContentDetails,
  ContentImage,
  ContentNoImage,
  VotingArea,
  CurrentPoint,
  ExpandableContent,
  TitleFlairText
} from './Card.styles';

const Card = ({ item, onOpenModal, onExpand }) => {
  const singleItem = item;
  const thumbnailImg = singleItem.thumbnail && singleItem.thumbnail.startsWith('http') ?
    singleItem.thumbnail : '';

  const isExpandable = (singleItem.selftext !== '' || (regexFilters.image).test(singleItem.url) || (regexFilters.youtube).test(singleItem.url) || singleItem.is_video);

  const onClickTitle = (currentItem) => {
    onOpenModal(currentItem);
  }

  const onShare = (item) => {
    if(copy(item.url)){
      alert('Copy Success!!!');
    }
  }

  return (
    <CardContainer>
      <ContentArea>
        <DetailsRow direction="row">
          <PostInformation post={singleItem} />
          <ActionsBar noMargin>
            { isExpandable && (
              <ActionItem onClick={() => onExpand(item)}>
                {
                  !singleItem.isExpanded ? <MdExpandMore size={24} color="#747474" /> 
                  : <MdExpandLess size={24} color="#747474" />
                }
              </ActionItem>
            )}
          </ActionsBar>
        </DetailsRow>
        <ContentRow>
          <ContentDetails>
            {/* <Link as={singleItem.permalink} href={`/?permalink=${singleItem.permalink}`} replace>
              <ContentTitle href="#" onClick={() => onClickTitle(item)}>
                {singleItem.link_flair_text && <TitleFlairText>{singleItem.link_flair_text}</TitleFlairText>}
                {singleItem.title}</ContentTitle>
            </Link> */}
            <ContentTitle href="#" onClick={() => onClickTitle(item)}>
                {singleItem.link_flair_text && <TitleFlairText>{singleItem.link_flair_text}</TitleFlairText>}
                {singleItem.title}</ContentTitle>
          </ContentDetails>
          { !singleItem.isExpanded && (
            thumbnailImg
              ? <ContentImage src={thumbnailImg} alt="item preview image" />
              : <ContentNoImage><MdComment /></ContentNoImage>
          )}
        </ContentRow>
        {
          isExpandable && singleItem.isExpanded && (
            <ExpandableContent>
              <ExpandedCardContent item={singleItem} />
            </ExpandableContent>
          )
        }
        <ActionsBar>
          <ActionItem><MdChatBubbleOutline /> {singleItem.num_comments} comments</ActionItem>
          <ActionItem onClick={() => onShare(item)}><MdShare /> Share</ActionItem>
          <ActionItem><MdLabelOutline /> {singleItem.domain}</ActionItem>
        </ActionsBar>
      </ContentArea>
      <VotingArea>
        <MdArrowDropUp size={25} color="#747474" />
        <CurrentPoint>{singleItem.score}</CurrentPoint>
        <MdArrowDropDown size={25} color="#747474" />
      </VotingArea>
    </CardContainer>
  );
};

Card.propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
  onExpand: PropTypes.func,
  onOpenModal: PropTypes.func,
};

Card.defaultProps = {
  item: {},
  onExpand: () => {},
  onOpenModal: () => {},
};

export default Card;
