package com.ss.crm.db.entity.impl.user;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * @author JavaSaBr
 */
@Entity
@DiscriminatorValue(value = "3")
public class ClientEntity extends UserEntity {
}
